export async function sendFormToTelegramBot(data: {
  [p: string]: string;
  createdAt: string;
}) {
  const res = await fetch("api/tlg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
