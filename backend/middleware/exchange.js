const axios  = require('axios')


async function getCurrentPriceString(req, res){
	var coin = req.params.coin;
	var validCoin = true;

	if(coin=='tether'){
        api_link = "https://api.coinlore.net/api/ticker/?id=518"
    }
    else if(coin=='bitcoin'){
        api_link = 'https://api.coinlore.net/api/ticker/?id=90'
    }
    else if(coin=='shiba'){
        api_link='https://api.coinlore.net/api/ticker/?id=45088'
    }
    else if(coin=='ethereum'){
        api_link='https://api.coinlore.net/api/ticker/?id=80'
    }
    else if(coin=='solana'){
        api_link ='https://api.coinlore.net/api/ticker/?id=48543'
    }
    else if(coin=='xrp'){
        api_link='https://api.coinlore.net/api/ticker/?id=58'
    }
    else if(coin=='dogecoin'){
        api_link = 'https://api.coinlore.net/api/ticker/?id=2'
    }
    else if(coin=='sandbox'){
        api_link='https://api.coinlore.net/api/ticker/?id=45161'
    }
    else if(coin=='tron'){
        api_link='https://api.coinlore.net/api/ticker/?id=2713'
    }
    else if(coin=='cardano'){
        api_link='https://api.coinlore.net/api/ticker/?id=257'
    } else {
		validCoin = false;
		res.send({ "error": "no valid coin given" });
	}

	if (validCoin) {
		await axios.get(api_link)
		.then((response)=> {
			res.send(response.data);
		})
		.catch((error)=> {
			console.log(error);
		})
	}
	
};


const getCurrentPrice = async(coin)=>{
    if(coin=='tether'){
        api_link = "https://api.coinlore.net/api/ticker/?id=518"
    }
    else if(coin=='bitcoin'){
        api_link = 'https://api.coinlore.net/api/ticker/?id=90'
    }
    else if(coin=='shiba'){
        api_link='https://api.coinlore.net/api/ticker/?id=45088'
    }
    else if(coin=='ethereum'){
        api_link='https://api.coinlore.net/api/ticker/?id=80'
    }
    else if(coin=='solana'){
        api_link ='https://api.coinlore.net/api/ticker/?id=48543'
    }
    else if(coin=='xrp'){
        api_link='https://api.coinlore.net/api/ticker/?id=58'
    }
    else if(coin=='dogecoin'){
        api_link = 'https://api.coinlore.net/api/ticker/?id=2'
    }
    else if(coin=='sandbox'){
        api_link='https://api.coinlore.net/api/ticker/?id=45161'
    }
    else if(coin=='tron'){
        api_link='https://api.coinlore.net/api/ticker/?id=2713'
    }
    else if(coin=='cardano'){
        api_link='https://api.coinlore.net/api/ticker/?id=257'
    }
    else {
        return -1
    }
    return await axios.get(api_link);
   

}


const exchange ={
    getCurrentPrice,
    getCurrentPriceString
}

module.exports= exchange