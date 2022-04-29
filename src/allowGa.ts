// @ts-ignore
export const gtag = window.gtag as any

export default function allowGa(){
  return window.location.host === "dl.meme.teahou.se" || window.location.host === "meme.wd-ljt.com" || window.location.host === "meme.teahouse.team"
}
