const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ulr = '/my-api/words';
const port = process.env.PORT || 3000;

var words = [
    {
        id: 0,
        word: "example",
        unique: true
    }, 
    {
        id: 1,
        word: "test",
        unique: true
    }
];



app.get(ulr, (req, res) =>{
    var queryString = req.query;
    if(typeof queryString.unique !== 'undefined')
    {
        var uniqueWords=[]
        for(i=0; i<words.length; i++)
        {
            if(words[i].unique)
            {
                uniqueWords.push(words[i]);
            }
        }
        res.status(200).send(uniqueWords)

    }
    else if(typeof queryString.find !== 'undefined')
    {
        count = 0;
        for(i=0; i<words.length; i++)
        {
            if(words[i].word == queryString.find)
            {
                count++;
            }
        }
        res.status(200).send({count: count})
    }
    else
    {
        res.status(200).send(words)
    }
})

app.get(ulr+'/:id', (req, res) =>{
    if(typeof words[req.params.id] !== 'undefined')
    {
        res.status(200).send(words[req.params.id].word)
    }
    else
    {
        res.status(403).send("no word found - id was incorrect")
    }
})

app.delete(ulr+'/:id', (req, res) =>{
    if(typeof words[req.params.id] !== 'undefined')
    {
        var word = words[req.params.id].word;
        

        //checking if now deleted word becomes unique
        if(!words[req.params.id].unique)
        {
            var count = -1; //word will be deleted 1 time 
            for(i=0; i<words.length; i++)
            {
                if(words[i].word == word)
                {
                    count++;
                }
            }
            if(count == 1)
            {
                for(i=0; i<words.length; i++)
                {
                    if(words[i].word == word)
                    {
                        words[i].unique = true;
                    }
                }
            }

        }
        words.splice(req.params.id, 1);


        for(i=req.params.id; i<words.length; i++)
        {
            //udpate the remaining id
            words[i].id--;
        }

        res.status(200).send("word deleted")
    }
    else
    {
        res.status(403).send("no word deleted - id was incorrect")
    }
})

app.post(ulr, (req, res) =>{

    if(typeof req.body.word !== 'undefined') 
    {
        var newWord = req.body.word;
        var unique = true;
        var id = words.length;
        for(i=0; i<words.length; i++)
        {
            if(words[i].word == newWord )
            {
                words[i].unique=false;
                unique=false;
            }
        }

        words.push({id: id, word: newWord, unique: unique});

        res.status(201).send(`${newWord} succesfully added`);
    }
    else
    {
        res.status(400).send(`No proper request body given. Given request body: ${JSON.stringify(req.body)}`);
    }

})

app.listen(port, () => console.log(`Listening on port ${port}`))