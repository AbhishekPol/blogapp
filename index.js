var express=require('express');
var methodOverride=require('method-override');
var app=express();

var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://dbuser:hello_world@cluster1.i6dj7.mongodb.net/message-database?retryWrites=true&w=majority');

var bodyparser=require('body-parser');

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({extended:true}));
var ObjectId = require('mongodb').ObjectId; 
var blogSchema=new mongoose.Schema({
   title:String,
   url:String,
   post:String
});

var blog=mongoose.model("blog",blogSchema);

// blog.create({
// 	title:"Heart of Spades",
// 	url:"https://www.elegantthemes.com/blog/wp-content/uploads/2015/11/Formatting-Content-in-WordPress.jpg",
// 	post:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod....."
// },function(err,blog)
// {
// 	if(err)
// 	{
// 		console.log(err);
// 	}
// 	else
// 		console.log(blog);
// });

app.get('/blogs',function (req,res) {
	
  blog.find({},function(err,thing)
  {
      if(err)
      {
      	console.log(err);
      }
      else
      {
      	res.render('home',{thing:thing});
      }
  });

    
});
app.post('/blogs',function(req,res)
{
	
	blog.create({
		title:req.body.title,
         url:req.body.url,
       post:req.body.post
	},function(err,thing)
	{
        if(err)
        {
        	console.log(err);
        }
        else
        {
        	console.log('Following blog added');
        	console.log(thing);
        }
	});
	res.redirect('/blogs');
})
app.get('/blogs/new',function(req,res)
{
	console.log(res.body);
    res.render('form');
});



app.get('/blogs/:id',function(req,res)
{
	var add = req.params.id;  
	var o_id = new ObjectId(add);
    blog.find({_id:o_id},function(err,thing)
  {
      if(err)
      {
      	console.log(err);
      }
      else
      {
      	
      	res.render('Read',{thing:thing});
      }
  });

});

 app.get('/blogs/:id/edit',function(req,res)
 {
     var add = req.params.id;  
	var o_id = new ObjectId(add);
    blog.find({_id:o_id},function(err,thing)
  {
      if(err)
      {
      	console.log(err);
      }
      else
      {
      	
      	res.render('edit',{thing:thing});
      }
  });
 });

  app.put('/blogs/:id',function(req,res)
  {
      
      	var add = req.params.id;  
	var o_id = new ObjectId(add);
    blog.update({_id:o_id},{$set:{title:req.body.title,post:req.body.post}},function(err,thing)
    	{
    		if(err)
    		{
    			console.log(err);
    			res.redirect('/blogs');

    		}
    		else
    		{
    			console.log(req.body.title);
    			console.log(req.body.post);
    			res.redirect('/blogs');

    		}
    	});
    	
  });
  
  app.delete('/blogs/:id',function(req,res)
  {
      	var add = req.params.id;  
	var o_id = new ObjectId(add);
    blog.remove({_id:o_id},function(err)
    	{
    		if(err)
    		{
    			res.redirect('/blogs');
    		}
    		else
    		{
    			console.log('Deleted post');
    			res.redirect('/blogs');

    		}
    	});
    	
  });

app.listen(3000);