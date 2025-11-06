export const getDashboardRooms = async () => {
  try {
    const response = await fetch("https://your-api-url.com/api/rooms");
    if (!response.ok) throw new Error("API 요청 실패");
    return await response.json();
  } catch (error) {
    console.error("Dashboard API Error:", error);
    throw error;
  }
};
