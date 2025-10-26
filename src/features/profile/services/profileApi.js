/* TODO: 실제 API 연동 시 axios로 대체 */
export async function getProfileData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "유지현",
        joinDate: "2025-03-10",
        groupCount: 5,
      });
    }, 300);
  });
}
