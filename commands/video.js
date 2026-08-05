const yts = require("yt-search");

module.exports = {
    name:"video",
    category:"Média",

    async execute({sock,from,args}){

        const query=args.join(" ");

        if(!query){
            return sock.sendMessage(from,{
                text:"⚠️ Exemple : !video titre"
            });
        }


        const result=await yts(query);
        const video=result.videos[0];


        if(!video){
            return sock.sendMessage(from,{
                text:"❌ Vidéo introuvable."
            });
        }


        await sock.sendMessage(from,{
            text:
`
╭━━〔 📹 YAMATO VIDEO 〕━━╮

🎬 ${video.title}

👀 ${video.views} vues

🔗 ${video.url}

━━━━━━━━━━━━

⚔️ Transmission terminée

👑 Petit Empereur
`
        });

    }
};