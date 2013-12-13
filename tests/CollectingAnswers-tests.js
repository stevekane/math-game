var  _ = require('lodash')
  , test = require('tape')
  , CollectingAnswers = require('./../states/CollectingAnswers');

//CollectingAnswers
test("CollectingAnswers is a constructor that sets a several attributes",
function (t) {
  t.plan(6);
  var ca = new CollectingAnswers;

  t.ok(typeof CollectingAnswers === "function", "CollectingAnswers is a constructor");
  t.ok(typeof ca === "object", "CollectingAnswers produces an instance");
  t.same(ca.name, "collecting-answers", "attribute name is  'collecting-answers'");
  t.ok(_.isArray(ca.submissions), "submissions is an array");
  t.same(ca.currentAnswer, null, "currentAnswer is null");
  t.same(ca.currentQuestion, null, "currentQuestion is null");
});

//enqueueSubmission
test("enqueueSubmission should store the answer in submissions", function (t) {
  t.plan(6);
  var ca = new CollectingAnswers
    , submission1 = {user: 1, answer:5}
    , submission2 = {user: 2, answer:6};

  ca.enqueueSubmission(submission1);
  t.ok(ca.submissions.length === 1, "length of submissions is now 1");
  t.ok(_.contains(ca.submissions, submission1), "submission1 is enqueued");
  t.ok(ca.submissions.indexOf(submission1) === 0, "submission1 is first in the queue");

  ca.enqueueSubmission(submission2);
  t.ok(ca.submissions.length === 2, "length of submissions is now 2");
  t.ok(_.contains(ca.submissions, submission2), "submission2 is enqueued");
  t.ok(ca.submissions.indexOf(submission2) === 1, "submission2 is second in the queue");
});
