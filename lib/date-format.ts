const messageCreatedAt = new Date(message.created_at);

// Format date
const formattedDate = messageCreatedAt.toDateString();

// Format time
const formattedTime = messageCreatedAt.toLocaleTimeString();

// Combine date and time
export const dateTimeString = `${formattedDate} ${formattedTime}`;

console.log(dateTimeString);
