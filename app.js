//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting to mongoose
mongoose.connect("mongodb+srv://shubham:Family@420@cluster0.llyom.mongodb.net/Blog",{useNewUrlParser:true,useUnifiedTopology: true });

//creating mongoose Schema
const blogSchema={
  title:String,
  content:String
};

//creating mongoose model
const Post=mongoose.model("Post",blogSchema);

app.get("/",function(req,res){

  Post.find({},function(err,foundItems){
    res.render("home",{startingContent:homeStartingContent,posts:foundItems});
  });

});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const newPost=new Post({
    title:_.upperFirst(req.body.postTitle),
    content:req.body.postBody
  });
  newPost.save();
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  var requestedPostId=req.params.postId;
  Post.findOne({_id:requestedPostId},function(err,result){
    if(err){
      console.log(err);
    }else{
      res.render("post",{postTitle:result.title,postContent:result.content});
    }

  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started sucessfully");
});
