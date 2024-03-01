# [Crypto-verse](https://crypto-net-ten.vercel.app/): A Cryptocurrency App 

Author: Ryan Freas

Created: November 18, 2023

<hr/>

Frontend: React, SCSS

Backend: MongoDB, Express, Node

<hr>

Crypto-verse is a cryptocurrency app that displays the latest crypto data, including the total market volume, 24H change, and information about various coins such as Bitcoin and Ethereum. The app also allows users to create an account, where they can add different currencies to their portfolio for later viewing. The API used to fetch the coin data is CoinGecko, which has a limit of 20 requests/minute.

The app is still undergoing updates, focusing on improvements in accessibility, speed optimization, SEO, and more.



| METHOD:    URL:                                        // DESCRIPTION                                    |
|----------------------------------------------------------------------------------------------------------|
| GET:       https://crypto-endpoint.cyclic.app/api/portfolio/                // get all coins in portfolio|
| POST:      https://crypto-endpoint.cyclic.app/api/portfolio/                // add coin to portfolio     |
| DELETE:    https://crypto-endpoint.cyclic.app/api/portfolio/:id             // delete coin from portfolio|
| POST:      https://crypto-endpoint.cyclic.app/api/user/signup/              // create account            | 
| POST:      https://crypto-endpoint.cyclic.app/api/user/login/               // login to account          |


The frontend of this app is hosted on [vercel](https://vercel.com/) and the backend is hosted on [cyclic.sh](https://www.cyclic.sh/)

Home Page:
<img src="./readme-images/home-image.jpg" alt="Home Page" style="width:100%;">

Trending Page:
![Trending Page](./readme-images/trending-page.png)


Hosted backend can be found at this repo: https://github.com/ryan2625Backup/crypto-net/tree/backend-test

Link: [crypto-verse](https://crypto-net-ten.vercel.app/)
