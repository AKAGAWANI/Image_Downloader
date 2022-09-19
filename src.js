const puppeteer=require('puppeteer')
const path=require('path')
const fs=require('fs')

const data=  async()=>{
const browser= await puppeteer.launch()
const page= await browser.newPage()
page.on("response",async(response)=>{
    const url=response.url()
    if(response.request().resourceType()==="image"){
        response.buffer().then((file)=>{
            const fileName=url.split('/').pop()
            if(url.split('.').pop()==="jpeg"||url.split('.').pop()==="png"){
            const filePath=path.resolve("photos",fileName)
            const writeStream=fs.createWriteStream(filePath)
            writeStream.write(file)
            }
        })
    }
})

await page.goto('https://www.growpital.com')
await browser.close()
    }

data()