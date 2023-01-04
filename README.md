# Arc Boosts

Personal collection of Arc Browser boosts.

[Arc browser](https://arc.net/) allows you to create browser extensions at ease. 
These extensions (Boosts) can also be enabled to only run on a specific website.

Currently, Arc doesn't feature an extension store so manual copy and paste is required (see [installation](#installation))

- [Twitter Enable Picture-in-Picture](./twitter-picture-in-picture/script.js) - twitter videos will play in picture-in-picture mode
  once unmuted.
- [Twitter Metric Ratios](./twitter-metric-ratios/README.md) - display ratio of comments/retweets/likes to engagement
  - ![screenshot-percentage](./twitter-metric-ratios/assets/percent.png)

## Take on Boosts

I believe many websites could do with simple extensions to satisfy the needs of some users.

Currently, [Chrome WebStore](https://chrome.google.com/webstore/category/extensions) (the only extension store) is not adapted for this:
- No filtering for website specific extensions
- Developing and publishing extensions is a fairy painful process
- Limited code quality control
  - No support for public/community code reviews
  - Source code reference is optional
  - No way of knowing source code = published extension

Additionally, most prominent extensions, even if fairly simple in their complexity, do not release source 
code publicly and require complete access on all websites. Considering the number of malicious extensions seen 
over the years, this is a huge security concern.

Arc Boosts present a way to solve some of these problems, mainly by being simple to write and being website specific.
Arc has not, of course, yet, addressed the hard extension store problem, but hopefully continuing along this path 
with feedback from the community we could hope for a WebStore alternative in the future. 


## Installation

1. Go to the directory of the boost you want to install
2. Open the website you want to install the boost on
3. Create `New Boost` with Arc (command pallet)
4. Click: Inject > A Specific Website > Create Boost
5. Replace content with the `script.js` file of the boost you want to install