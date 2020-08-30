import os
import time
import asyncio
import jinja2
import importlib
import aiohttp_jinja2
from asyncio import subprocess
from concurrent.futures import ThreadPoolExecutor
from aiohttp import web

app = web.Application()
aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader("./views"))
executor = ThreadPoolExecutor(8)
build_time = 0.0
builder_lock = asyncio.Lock()
env = {"update": 0.0, "data": {}}


def get_env():
    je_builder = importlib.import_module('meme-pack-java.build')
    be_builder = importlib.import_module('meme-pack-bedrock.build')
    mods = map(lambda file: f"mods/{file}", os.listdir('meme-pack-java/mods'))
    enmods = map(lambda file: f"en-mods/{file}",
                 os.listdir('meme-pack-java/en-mods'))
    language_modules = map(
        lambda module: f"modules/{module}", je_builder.module_checker().language_module_list)
    resource_modules = map(
        lambda module: f"modules/{module}", je_builder.module_checker().resource_module_list)
    return dict(mods=list(mods), enmods=list(enmods), language=list(language_modules), resource=list(resource_modules),
                manifests=je_builder.module_checker().manifests,
                be_resource=be_builder.module_checker().module_list,
                be_manifests=be_builder.module_checker().manifests)


@aiohttp_jinja2.template("index.html")
async def index(_):
    if env["update"] + 60 < time.time():
        env["data"] = get_env()
        env["update"] = time.time()
    return env["data"]


async def ajax(request: web.Request):
    data = await request.json()
    log = []
    async with builder_lock:
        global build_time
        if build_time + 60 < time.time():
            build_time = time.time()
            proc = await asyncio.create_subprocess_exec("git", "pull", "origin", "master", "--recurse-submodules",
                                                        stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
                                                        stdin=subprocess.DEVNULL)
            log.append(str((await proc.communicate())[0], encoding="utf-8", errors="ignore"))
        else:
            log.append("Build file up to date, skipping update\n")
        if not data["_be"]:
            builder = importlib.import_module('meme-pack-java.build').builder()
        else:
            builder = importlib.import_module(
                'meme-pack-bedrock.build').builder()
        builder.args = data
        await asyncio.get_event_loop().run_in_executor(executor, builder.build)
        log.append(builder.logs)
    return web.json_response({"code": 200, "argument": data,
                              "logs": ''.join(log),
                              "filename": builder.filename})


if not os.path.exists("./builds"):
    os.mkdir("builds")

app.add_routes([
    web.static("/static/", "./static"),
    web.static("/builds/", "./builds"),
    web.route("GET", "/", index),
    web.route("POST", "/ajax", ajax)
])

if __name__ == '__main__':
    import sys
    if sys.platform == "win32":  # <- Special version
        asyncio.set_event_loop(
            asyncio.ProactorEventLoop()
        )
    web.run_app(app, host="127.0.0.1", port=8000)
