import asyncio
import importlib
import os
import time
from asyncio import subprocess
from concurrent.futures import ThreadPoolExecutor
from os.path import join, dirname

import aiohttp_jinja2
import jinja2
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
    je_checker = je_builder.module_checker(join('meme-pack-java', "modules"))
    je_checker.check_module()
    je_modules = je_checker.module_info['modules']
    be_checker = be_builder.module_checker(join('meme-pack-bedrock', "modules"))
    be_checker.check_module()
    be_modules = be_checker.module_info['modules']
    return dict(mods=list(mods), enmods=list(enmods),
                je_modules=je_modules, be_modules=be_modules)


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
            log.append("A cache within 60 seconds is available, skipping update")
        if not data["_be"]:
            submodule_path = 'meme-pack-java'
            pack = importlib.import_module('meme-pack-java.build')
        else:
            submodule_path = 'meme-pack-bedrock'
            pack = importlib.import_module(
                'meme-pack-bedrock.build')
        pack_builder = pack.pack_builder
        data.setdefault('output', 'builds')
        module_checker = pack.module_checker(join(submodule_path, "modules"))
        current_dir = dirname(__file__)
        module_checker.check_module()
        if not data["_be"]:
            builder = pack_builder(
                join(current_dir, submodule_path, "meme_resourcepack"), module_checker.module_info,
                join(current_dir, submodule_path, "mods"),
                join(current_dir, submodule_path, "mappings"))
        else:
            builder = pack_builder(
                join(current_dir, submodule_path, "meme_resourcepack"), module_checker.module_info)
        builder.args = data
        await asyncio.get_event_loop().run_in_executor(executor, builder.build)
        log.extend(builder.log_list)
    return web.json_response({"code": 200, "argument": data,
                              "logs": '\n'.join(log),
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

    if sys.hexversion < 0x030500F0:
        raise RuntimeError(
            "This program uses features introduced in Python 3.5, please update your Python interpreter.") from None
    elif sys.hexversion < 0x030800F0:
        if sys.platform == "win32":  # <- Special version
            asyncio.set_event_loop(
                asyncio.ProactorEventLoop()
            )
    web.run_app(app, host="127.0.0.1", port=8000)
