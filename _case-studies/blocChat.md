---
layout: page
projName: blocChat
---

# Chat App Case Study

---

## Summary
Bloc Chat is a simple chat room site. It allows users to register an account, create their own chat rooms,
and send messages to other users. I used this project as an opportunity to learn the [Meteor](www.meteor.com)
framework, particularly it user accounts tools and DDP interface with a lite version of
[Mongo No SQL Database](www.mongodb.com).

---

## Explanation
Before this project, I had just begun working with the [React](https://facebook.github.io/react/) templating framework.
Because this web app needed a persistent data store for users and messages, I decided to try expanding my knowledge into the backend with Meteor.

Meteor is what's called a Backend as Service (BaaS), comparable to [Firebase](www.firebase.com). It Exposes
server-side functionality like database queries through a simple api. It began as a fairly opinionated platform.
It required you to use their [Blaze](https://guide.meteor.com/blaze.html) templating engine and favored the
[Flow Router](https://github.com/kadirahq/flow-router) to simulate site navigation within a single page app.

Meteor is in the process of moving away from this proprietary stance to become more adaptive and flexible.
Currently, there are many monkey patch libraries out there to smooth over the process of integrating other third party libraries,
However, the developin team behind Meteor seem intent on freeing up the platform to play nice with big names such as
Angular and React, while maintaining the eary-to-use api their users have come to love.

Redux is implemented using Meteor Methods, which allow for secure communication between the Redux store and actions
and the Meteor/mongo collections. Meteor's pub/sub methods are used to update the client whenever a mongo collection
is altered. This is another aspect of Meteor which is currently under review. Meteor uses DDP,
or [Distributed Data Protocol](https://meteorhacks.com/introduction-to-ddp/) to send JSON files between the client
and server, by way of the [WebSocket API](https://en.wikipedia.org/wiki/WebSocket). They seem to be shifting away
from their publication and subscription model and towards the more flexible **Meteor Methods** for all asynchronous
communication with the server.

DDP is the heart of Meteor's speed and is constantly being updated, so if you decide to try Meteor out for yourself,
be sure to look up the latest best practices. They have great [documentation](https://docs.meteor.com/) and a
helpful, vocal community.

---

## Problem
- #### List ChatRooms
  Create a list of all available chat rooms, along with the names of the users who created those rooms.  
  
- #### Create ChatRooms  
  Allow the user to create a new chat room, and update the chatrooms list in real time.  
  
- #### Send and List Messages  
  When a chatroom is selected allow the user to input a message and have it live update in the chat room display.
  Messages should list the username of who posted that message, as well as the time it was submitted.
  Messages should be joined with the database entry for the current chatroom, such that if the user changes chatrooms,
  they will only see messages that were submitted in the currently displayed room.  
  
- #### Set Username  
  Create a user accounts system that prompts a visitor to the site to either log in or create an account. This
  form should be appropriately validated and users shouldn't be allowed to progress through the the main of the
  site without first logging in or creating an account.

---

## Solution

For the UI, the concept I sketched out featured a simple two column layout and a goofy lava-lamp theme.
The final interface replicates this fairly closely. I had thought of a lot more animations and art assets
(like the line drawn avatars seen to the left), but time constraints pushed these ideas out of the final project.

<div class="case-study-assets"
     markdown="1">

<div class="row center">
<img src="../../assets/blocChatConcept.png"
     alt="blocChat concept image"
     id="blocChatConcept" />
</div>

</div>

As a jumping off point, I began this project by forking a [repository](https://github.com/jstruthers/react-redux-meteor)
that a mentor of mine, [Jeff Lau](http://jefflau.net/#open), made. It helped me with the meshing Meteor's methods
with Redux's actions.

Apart from the user interface, figuring out this API was the most difficult part of the project. The queries
themselves must be written in Mongo's BSON syntax, and coordinating the Meteor methods with actions required
a clear understanding of call back functions.  

Here's an example from `/imports/api/`:  

<p class="aside" markdown="1">
There's a dedicated folder for `collections`, which are like Mongo's version of a table in standard SQL.
Each collection would be defined in its own javascript file.
The following line creates the collection:
</p>

{% highlight javascript %}
const Todos = new Mongo.Collection('todos');
{% endhighlight %}
<p class="aside" markdown="1">
Specific queries to the database are then exposed to the client with a function defined like this:
</p>
{% highlight javascript %}
export function createTodo(text) {
  return Todos.insert({
    text
  })
}
{% endhighlight %}
<p class="aside" markdown="1">
Now, in a `methods.js` file, at `/imports/api/methods.js`, Meteor can correspond with the Mongo database.
</p>
{% highlight javascript %}
import Todos, { createTodo } from './collections/todos';

Meteor.methods({
  addTodo(text){
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!text){
      throw new Meteor.Error('text missing', 'Cannot submit an empty message');
    }

    return createTodo(text);
  }
};
{% endhighlight %}
<p class="aside" markdown="1">
`Todos` is our collection object, and `{ createTodo }` is one of the queries that we defined.
The `Meteor.methods({...` block defines the client facing api that can be used in our React components.<br/><br/>

Alternatively, the sibling file `publications.js` can be used:
</p>
{% highlight javascript %}
import Todos from './collections/todos';

Meteor.publish('allTodos', function() {
  return Todos.find({});
});
{% endhighlight %}
<p class="aside" markdown="1">
I used publications while working with
Meteor's user-accounts add on, because of the way it programmatically generates a collection for users.
</p>

These methods and publications are triggered when one of the forms is submitted. The data is taken from the
input field and formatted as a database query, then stored in a 'mini-mongo' client-side database. This
allows the client to continue running up to speed, while potentially large volumes of data are asynchronously
sent to the server.

Below are a few examples of these forms in action. React, Redux, Meteor, along with three smaller libraries,
[React-Router](https://github.com/reactjs/react-router), [Redux Form](https://github.com/erikras/redux-form), 
and Meteor's [accounts-password](https://atmospherejs.com/meteor/accounts-password),
work together to send, store, and update chat and account information.

<div class="case-study-assets"
      markdown="1">

<div class="row space">
<div class="gif-wrapper"
     id="blocChatCreateRoom">
<img data-gifffer="../../assets/createRoom.gif"
     data-gifffer-alt=".gif of user creating a room"
     class="gifffer" />
<p class="caption">
  Chat rooms can only be deleted by the user that created them.
</p>
</div>

<div class="gif-wrapper"
     id="blocChatLogin">
<img data-gifffer="../../assets/blocChatLogin.gif"
     data-gifffer-alt=".gif of user creating an account"
     class="gifffer" />
<p class="caption">
  User is logged in automatically after creating a new account.
</p>
</div>
</div>

<div class="row center">
<div class="gif-wrapper"
     id="blocChatLogin">
<img data-gifffer="../../assets/sendMessage.gif"
     class="gifffer"
     data-gifffer-alt=".gif of user sending a message" />
<p class="caption">
  Each chat room keeps a `messageLog` <a href="https://docs.mongodb.com/manual/core/document/">Mongo document</a>
  in the form of an array. Messages submitted in a chat room are stored in this array,
  along with who wrote that message and when.
</p>
</div>
</div>

</div>

Redux Form was a breeze to work with, as it exposed numerous conditional checks for validating a form,
such as whether the user has begun typing and but then un-focused the field,
or failed some custom error check that you've defined yourself. These exposed 'conditional hooks'
help you as the developer manage state in various React components.  

You can see an example of this above, where a new user is created. When trying to log in, a red error message
is displayed briefly. This is because the user clicked in the `input name field` and then tabs down to the
`input password field` without filling anything in for a username.

Further checks can be made to validate the strings received at the `methods.js` file. The `user-accounts` add on
uses encryption when working with the password field, so if the database were compromised in any way, the strings
would appear to be gibberish.

---

## Results

After getting the functionality in place, I translated the assets I had created in my mock up to html and css.
You can see that the layout is almost the same, minus some of the graphics. One addition is that the
current user's status is shown in the upper left, along with a button for logging out. This will re-route the
browser to the initial log in screen.

<div class="row center" markdown="1">
<img src="../../assets/blocChatFinal.png"
     alt="blocChat final layout"
     id="blocChatFinal" />
</div>

Of course, chatting to myself was getting pretty tedious by now. What's a chat app worth without friends!
To make this last jump, I deployed this Meteor app to [Heroku](www.heroku.com) by way of the
[Meteor Buildpack Horse](https://github.com/AdmitHub/meteor-buildpack-horse). And just like that, blocChat
was connecting people world wide! Or at least appartment wide, as it stands now.

You can check it out for yourself [here](https://jsbloc-chat.herokuapp.com)

---

## Conclusion

This was my second project working with React and Redux, so I was starting to feel more comfortable with
them as tools. I began to see how quickly they stream-line and organize a project.

Jumping into Meteor was pretty daunting to begin with. But the amount of functionality offered out of the
box more than compensated for the initial learning curve. I'm hoping it will be a gateway to learning
more server side development skills, but for now, I'll definitely be giving it another shot in the future.

This is a very skeletal app, and there's a ton of room for improvement. I would like to flesh out the
user accounts system by adding the ability to promote users to administrators, make private chat rooms,
and customize your presence in the chat room. Also, some kind of friend list system. I feel that
with the system that's currently in place, it wouldn't take time at all to expand the app with new features.
