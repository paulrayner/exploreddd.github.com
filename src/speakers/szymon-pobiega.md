---
layout: layout-speaker.html
---
<div class="container section featured-speaker">
  <div class="row">
    <div class="col-xs-12 col-sm-2 img-container">
      <img class="speaker-page-img" src="../img/speakers/Szymon-Pobiega-ON.png">
    </div>
    <div class="col-xs-12 col-sm-10 copy-container">
        <h1 class="speaker-header">Szymon Pobiega</h1>
        <span class="speaker-subtitle">Distributed engineer, AFOL</span>
        <p><a class="speaker-handle" href="https://twitter.com/SzymonPobiega" target="_blank">@SzymonPobiega</a></p>
        <p>Szymon Pobiega used to work on various business software for almost a decade. Of all the ideas and patterns he learnt along the way, asynchronous messaging had the most profound impact.</p> 
        <p>Over three years ago Szymon quit consulting and joined Particular Software with hope to use his field experience to build tools for developing distributed systems. Szymon is focused, in Particular (pun intended), on message routing patterns and handling of failures</p>
        <h2>Talk Session</h2>
        <h2 class="gold">Messages on the Outside, Messages on the Inside</h2>
        <p>In the classic paper, "Data on the Outside versus Data on the Inside", Pat Helland argued that data within a service boundary should be treated differently than data residing outside of it. 
        <p>Here, I shall argue that the same applies to messages. Inside a service boundary messages are tightly coupled to the corresponding data manipulations. Sometimes it is even possible to enforce total order of messages.</p>
        <p>The moment the message crosses the service boundary, it enters the no man's land where bad things happen. Messages get reordered, duplicated or even lost.</p>
        <p>Join me in this talk to learn about some patterns you can use to get your messages safely to the other side.</p>
    </div>
  </div>
</div>