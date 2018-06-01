---
layout: layout-speaker.html
---

<div class="container section featured-speaker">
  <div class="row">
    <div class="col-xs-12 col-sm-2 img-container">
      <img class="speaker-page-img" src="../img/speakers/Dave-Buchanan-ON.png">
    </div>
    <div class="col-xs-12 col-sm-10 copy-container">
        <h1 class="speaker-header">Dave Buchanan</h1>
        <h2 class="speaker-subtitle">Software Architect</h2>
        <p class="copy"><a class="speaker-handle" href="https://twitter.com/dave_r_buchanan" target="_blank">@dave_r_buchanan</a></p>
        <h2 class="speaker-subheader"><strong>biography</strong></h2>
        <p class="copy">It all started with summer school and a Texas Instruments computer in 1984! Since then Dave has 19 professional years experience in web development, architecture, management, and mentoring others. His expertise is in integrating new technologies, leveraging open source for the enterprise, and team building. Dave has presented in the past at MadisionPHP 2016, OpenWest 2016, MinneBar 2016, and WordCampMSP in 2014 and 2013.</p>
        <h2 class="speaker-subheader">Talk Session</h2>
        <h2 class="speaker-subheader gold">How to Get Started with DDD, a Case Study Breaking Away From a Legacy MVC App</h2>
        <p class="copy">This talk will be a walk through of integrating DDD design patterns and why it has proven itself worthy. InboxDollars is a 15+ year old PHP application. It has very complex business rules to serve its over 2 million members. Over time, business logic became scattered in Models, Controllers, AppControllers, shared libraries to even older code....Which led to business rules being misinterpreted or lost when integrating a new technology.</p>
        <p class="copy">The talk will walk through how DDD patterns have been integrated over the past two years. And why it has led to consistently applied business rules and less bug fixes. Its applicability will be discussed within the context of Vernon Vaughns/Eric Evans framing of Domain Driven Design. Focus will be with DDD and the repository pattern.</p>
        <p class="copy">There are several use cases that enable your application to be more maintainable and adaptable using DDD and the repository pattern.</p>
        <p class="copy">Use case #1:  Multiple data sources (Feature needs to merge data from mysql, redis, memcache).</p>
        <p class="copy">Use case #2:  Separation of concerns. Domain code can be easily read, to grasp business rules. Feature is big enough that having things separate makes sense. Easier to support and identify performance issues, swapping out data sources. Writing unit tests are easier, just replace repository with in-memory repo. Business rules of feature live separate from getting the data.</p>
        <p class="copy">Use case #3:  Break away from framework MVC approach. (If data needed for feature is from multiple mysql tables, it makes sense to wrap all these into a repository instead of stuffing into a model).</p>
        <p class="copy">Examples will show before and after implementing a repository pattern within the CakePHP framework.</p>
        <!--<a class="btn" href="https://ti.to/explore-ddd-conference/2017">Buy Tickets</a>-->
    </div>
  </div>
</div>