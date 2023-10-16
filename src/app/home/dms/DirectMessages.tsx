const messages = [];

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(messages);
  } else if (req.method === "POST") {
    const { user, text } = req.body;
    messages.push({ user, text });
    res.status(201).json({ message: "Message sent successfully" });
  }
};
