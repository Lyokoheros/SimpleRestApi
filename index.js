const express = require('express');
const app = express();

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
        res.statusCode(200).send(uniqueWords)

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
        res.statusCode(200).send(count)
    }
    else
    {
        res.statusCode(200).send(words)
    }
})

app.get(ulr+'/:id', (req, res) =>{
    if(typeof words[req.params.id] !== 'undefined')
    {
        res.statusCode(200).send(words[req.params.id].word)
    }
    else
    {
        res.statusCode(403).send("no word found - id was incorrect")
    }
})

app.delete(ulr+'/:id', (req, res) =>{
    if(typeof words[req.params.id] !== 'undefined')
    {
        word.splice(req.params.id, 1);
        for(i=req.params.id; i<words.length; i++)
        {
            //udpate the remaining id
            words[i].id--;
        }

        res.statusCode(200).send("word deleted")
    }
    else
    {
        res.statusCode(403).send("no word deleted - id was incorrect")
    }
})

app.post(ulr, (req, res) =>{

    var newWord = "";
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

    words.push({id: id, word: newWord, unique: unique})

    res.statusCode(201).send(`${newWord} succesfully added`)
})

app.listen(port, () => console.log(`Listening on port ${port}`))