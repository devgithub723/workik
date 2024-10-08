const axios = require('axios');

exports.handleWebhook = async (req, res) => {
  const event = req.headers['x-github-event'];
  const accessToken = req.user.accessToken; // Assuming user is authenticated

  if (event === 'pull_request' && req.body.action === 'opened') {
    const prData = req.body.pull_request;
    const reviewComment = await analyzePR(prData); // Call your AI model

    await postReviewComment(prData.comments_url, reviewComment, accessToken);
  }

  res.status(200).send();
};

const postReviewComment = async (commentsUrl, comment, accessToken) => {
  await axios.post(commentsUrl, {
    body: comment,
  }, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
};

const analyzePR = async (prData) => {
  // Call your AI model or service to analyze the PR
  // Example: return 'Great work on this PR!';
  return 'Your AI model output here.';
};
