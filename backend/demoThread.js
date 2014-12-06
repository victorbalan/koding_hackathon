module.exports = function(milis){
	setTimeout(function(){
		console.log("finished in " + milis)
	},milis)
}