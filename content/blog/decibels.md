---
title: "Decibels"
date: 2023-09-22T13:40:08-04:00
draft: true
katex: true
description: How you can use decibels for quick multiplication and comparing proportions
---

In our number system, it is not very easy to quickly multiply numbers or to
quickly judge how much bigger one number is than another. When you look at a
number, the first thing you look for to get a feel for how big it is is the
number of digits, and the second thing is the first digit. However, not all
digits are created equal. If the first digit is a 1, then your number could be
as large as, say, 1,999, nearly twice the smallest it can be, 1,000, and so you
really need to look at the second digit to get a feel for the size of your
number. On the other hand, if the first digit is a 9, then the largest possible
value is only 11% larger than the smallest, so you already have a decent idea of
the magnitude. This idea is often formalized in [Benford's law], which states
that in typical data sets the first digits of the numbers are not evenly
distributed, with 1 appearing about 30% if the time, 2 appearing the second
most, etc.

Quickly judging multiplication is not easy either, and is also dependent on the
first digit. If i asked you what's 3,950 times 5,050, you could estimate that as
4,000 times 5,000, and tell me 20,000,000 pretty easily. If i asked you what's
1,250 times 1,580, it's not so straightforward. Maybe you could estimate it as
1200 * 1600, but now you're doing multiplication with two significant figures,
which is already much harder. If you just wanted to quickly estimate the answer,
you might not bother in this case. In both these cases, the proportions of our
two numbers are the same. That is to say, if 3.16 cm make an inch, then you'd be
doing the first problem if you work in centimeters and the second if you work in
inches. So these two multiplication problems are essentially the same with a
different skin, yet one looks harder and it's harder to us for no good reason.

Enter decibels. The decibel scale was originally meant for measuring the volume
of sound, but it can be combined with other units (dBmW, decibel milliwatts, are
often used to measure internet signal strength), or just used to represent plain
numbers. The definition of the scale is that 10 decibels is a factor of 10. So
20dB = 100, 30dB = 1,000, 0dB = 1, etc. This means that 5dB is the square root
of ten, 1dB is the tenth root of ten, etc. One incredibly useful coincidence is
that 3dB is very close to 2. This corresponds to the fact that 2^10 = 1024 ~
1000 = 10^3.

Now let's revisit our previous examples but with decibels, and see if they're
easier. 1,000 and 1,999 written in decibels are 30dB and 33dB. Before we need to
look at three pieces of information -- the number of digits, the first digit,
and the second digit -- to get a feel for the number, but now we can get a good
feel with only two: the tens place in dB (and higher places) tell us the order
of magnitude of the number, and the ones place tells us pretty well where the
number falls within that order of magnitude. The numbers starting with one get
the 0 - 3 range when written in decibels, so a proportional amount of our scale
is dedicated to these numbers. Meanwhile 80,000 is 49dB and 90,000 is 49.5dB, so
these numbers get squeezed into a smaller part of our scale, which is good
because they are proportionally closer.

One of the key properties of decibels is that x dB * y dB = (x + y) dB. That is,
decibels turn multiplication into addition (and division into subtraction). So
our previous problem, 3,950 * 5,050, becomes 36dB * 37dB, which is just 73dB.
About as easy as before. But, 1,250 * 1,580 becomes 31dB * 32dB which is 63dB.
That's much easier than before, and importantly, it's the same difficulty as the
first problem, as it should be.

## Decibel arithmetic tips

One time in a meeting in my first internship, we were talking about poker hand
probabilities. Someone asked how many possible hands the are, and nobody knew
off the top of their head, so we just moved on. Using decibels, i was able to
calculate in my head that it was about 2 million, and i then refined my estimate
to 2.5 million, impressing all my coworkers when we looked it up and it was ~2.6
million. Later i refined my method further and saw that i could have gotten 2.6
million. Once you learn the tips in this section, you'll be able to do these
kinds of calculations in your head too.

### converting to and from decibels

As i mentioned before, the approximation 3dB = 2 is going to be our best friend.
This also tells us that 6dB = 4 and 9dB = 8. Working backwards from 10dB = 10,
we get that 7dB = 5, 4dB = 2.5, and 1dB = 1.25.

For 5dB, we can use the approximation √10 = π to get 5dB = 3.14, 8dB = 6.28, and
2dB = 1.57. This approximation is not the most accurate or the easiest to use,
but it is easy to remember. Sightly more accurate is 5dB = 3 1/6 (that's an
improper fraction! This is the first time I've used those since elementary
school.) Which gives 2dB = 1 7/12 and 8 dB = 6 1/3. A helpful way to remember
the 2dB approximation is that 0dB, 1dB, 2dB, and 3dB break the interval [1, 2]
into pieces of proportion 3 to 4 to 5. The relative errors of all these
estimates are around -20dB, or 1%.

For values in between a whole number of decibels, the best way to convert is by
interpolating linearly. Todo: estimate error. For example, to convert 3 into
decibels, we recall that 4dB = 2 1/2 and 5dB = 3 1/6. 3 is 3/4 of the way from 2
1/2 to 3 1/6, so 3 = 4 3/4 dB.

Now as an example of how to convert the other way, say we want to find 2*3 using
decibels. That's (3 + 4 3/4) dB = 7 3/4 dB. 7dB = 5 and 8dB = 6 1/3, so three
quarters of the way from 5 to 6 1/3 is 6. Todo: more useful examples.

The error of this linear interpolation is on the order of -20dB, so as long as
we're using the above mentioned reference points there's no reason to use a
better interpolation method.

Now I'll show you how use this to estimate the number of poker hands to three
levels of approximation. The number of ways to choose five cards out of 52 is
called "52 choose 5", and there's a well known formula for this:

$$\frac{52 51 50 49 48}{5 4 3 2 1}$$

Now, these numbers in the numerator all differ from 50 with a relative error of
one or two parts in fifty, and the first order error of 51 will cancel with 49
and 52 with 48 when we multiply leaving us with only second order error.
Therefore 50^5 approximates the numerator with relative error on the order of
(2/50)^2, or about -28dB.

Now 50 = 17dB, so 50^5 is 85dB. The denominator comes out to 120, which is close
to 125 = 21dB. So our final answer is 64dB = 2.5 million. Pretty close to the
answer of _!

But we can do better. Instead of rounding 120 to 125, we can interpolate
linearly. 120 is 4/5 of the way from 100 to 125, so it's closer to 20.8dB. So
our final answer is 64.2dB, which is one fifth of the way from 2.5 million to 3
1/6 million, or about 2.63 million. If you round this to 2.6 million, you'll get
lucky and get a lot closer to the answer.

## Conclusion

The first take away is that when you encounter numbers in the wild and you need
to compare their proportions, multiply, or divide, you may find it useful to
convert them to decibels first. I find that it's often not worth it for one off
multiplication or division, but for products of many numbers, exponents, and
comparisons, this conversion can be very helpful.

But the bigger point is that I think we should start presenting many numbers in
decibels in the first place. This will greatly improve the ease of common
operations on these numbers, but it would require people to become literate in
decibels. If you agree that we should all start using decibels, then you can
start using them and share this article around so that people will understand
you. Also, interpreting quantities in decibels does not require knowing how to
convert between decibels and plain numbers, so this is accessible to a larger
audience.

I would like to emphasize that not all numbers are made equal. Some numbers are
meant to be multiplied and divided and compared proportionally, and for those
numbers we should use decibels. Other numbers are meant to be added and
subtracted and compared using differences, and for these numbers it would not be
helpful to use decibels.

Lastly, I'll mention that decibels are what's known as a logarithmic scale. I've
avoided using this word because I don't want to scare people away. I think that
the content in this post is actually pretty accessible, but
