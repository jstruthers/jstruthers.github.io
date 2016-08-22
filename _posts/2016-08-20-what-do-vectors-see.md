___
title: What Do Vectors See?
___

To me, computer graphics are pretty close to magic. From a you age I've been mesmerized by the wonders programmers
have been able to tease to tease out of simple binary strings. And it might as well have been magic. Despite
growing up with computers as a constant component of my life, I'd never ventured past the Graphical User Interface
that to 'peak behind the curtain'.  

I decided to get into programming recently. My reasons were many, but the driving one was probably that I
never quite sated my fascination with how ones and zeros become the stuff of dreams. And I quickly found out,
there's a reason for that...  

Graphics are one of the most RAM hungry, mathematically perplexing areas of computing technology. Maths isn't
my strong suit, and if I was going to even begin learning about how pretty pictures get pasted to the screen,
I'd have to get aquianted with, at the very least, Linear Algebra. While this realm of abstraction scared the
bajeebuz out of me at first, the more I toyed with it, the more my interest grew.  

At the heart of programming is iteration, and rendering graphics is a great example of this.
All images start as simple dots on a coordinate plane. Linear Algebra is the language we use to describe
the world those points interact in. When two points meet, They make a line. A group of three can form a plane.
If a crowd of these guys group together as some convex polygonal solids, man, we got a party! But three dimensions
can be a bit disorienting without a firm foundation. I find it useful with programming that you can always
scale back to the most essential building blocks. And in the case of graphics, those building blocks are vectors.

So, regarding foundations, where do we get our start with this math-magic?
Lucky for me, and all of you, we live in a time where knowledge, particularly that related to
computer science and maths, is literally at our finger tips. As a gesture to the community that's offered so
much to me, I'll be writing a series of blog posts on a basic problem when we try to render autonomous moving
bodies, collision detection.

I don't want to just rehash what I've read, I'd like to actually contribute something useful. So I'll be trying
to fill in a gap that I found while browsing. All of my examples will be written in vanilla javascript,
which is the most accessible programming language, because if you're reading this, you've already got all the tools
to start. I'll also be incorporating working demos that you can fiddle with yourself.

I'll leave you with a couple of links that I found tremendously helpful.
They both point to the Khan Academy website, which, if you're a beginner like me, is an invaluable resource.
Many thanks to Sal Khan and his team for that generous effort.

[Khan Academy's Linear Algebra Curriculum](https://www.khanacademy.org/math/linear-algebra)

[A Computer animation curriculum, which is a collaboration between Khan Academy and Pixar Animation Studios](https://www.khanacademy.org/partner-content/pixar)
