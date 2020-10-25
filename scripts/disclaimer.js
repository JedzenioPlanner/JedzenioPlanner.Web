$(document).ready(function() {
    fetch("/api/disclaimer").then(resp=>{
        resp.text().then(content=>{
            $("#disclaimer").text(content)
        }).catch(error=>{
            console.error(error)
        })
    })
})