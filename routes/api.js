"use strict";
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");

module.exports = function (app, db) {
	//Index page (static HTML)
	app.route("/").get(function (req, res) {
		res.sendFile(process.cwd() + "/views/index.html");
	});

	const fetch_data = async (stock, n) => {
		const res = await fetch(
			`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock
				.toLowerCase()
				.trim()}/quote`
		);
		const data = await res.json();
		let obj;
		if (typeof data == "object") {
			obj = {
				stock: stock.toUpperCase(),
				price: data.latestPrice,
			};
			if (n == 2) {
				obj.rel_likes = 0;
			} else {
				obj.likes = 0;
			}
		} else {
			obj = {
				error: "Stock Symbol is incorrect",
			};
		}
		return obj;
	};

	const get_and_add_likes = async (r, stock, ip) => {
		if (r.hasOwnProperty("error")) {
			return null;
		}
		const doc = await db.findOneAndUpdate(
			{ stock: stock },
			{
				$addToSet: { ips: ip },
			},
			{ returnOriginal: false, upsert: true }
		);
		return doc.value.ips.length;
	};

	const get_likes = async (r, stock) => {
		if (r.hasOwnProperty("error")) {
			return null;
		}
		const doc = await db.findOneAndUpdate(
			{ stock: stock },
			{
				$setOnInsert: { ips: [] },
			},
			{ returnOriginal: false, upsert: true }
		);
		return doc.value.ips.length;
	};

	app
		.route("/api/stock-prices")
		.get(async function (req, res) {
			const stocks = req.query.stock;
			const like = req.query.like == "true" ? true : false
			const ip = req.ip;
			const result = {};
			if (typeof stocks == "object") {
				result["stockData"] = [];
				const likes = [];
				for (let i = 0; i < 2; i++) {
					let r = await fetch_data(stocks[i], 2);
					result.stockData.push(r);
					let l;
					if (like == true) {
						l = await get_and_add_likes(r, stocks[i], ip);
					} else {
						l = await get_likes(r, stocks[i]);
					}
					likes.push(l);
				}
				for (let i = 0; i < 2; i++) {
					if (result.stockData[i].hasOwnProperty("error")) {
						continue;
					}
					try {
						let rel_likes =
							likes[i] - likes[i == 1 ? i - 1 : i + 1];
						result.stockData[i].rel_likes = rel_likes;
					} catch (err) {
						console.log(err)
						result.stockData[i].rel_likes = likes[i];
					}
				}
			} else {
				let r = await fetch_data(stocks, 1);
				result.stockData = r;
				let l;
				if (like == true) {
					l = await get_and_add_likes(r, stocks, ip);
				} else {
					l = await get_likes(r, stocks);
				}
				if (l != null) {
					result.stockData.likes = l;
				}
			}
			res.json(result);
		});
};
