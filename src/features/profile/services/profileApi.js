/* TODO: 실제 API 연동 시 axios로 대체 */
export async function getProfileData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: "a123@naver.com",
        nickname: "유지현",
        profile_image: "null",
      });
    }, 300);
  });
}
