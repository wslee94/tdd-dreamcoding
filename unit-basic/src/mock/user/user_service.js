class UserService {
  constructor(userClient) {
    this.userClient = userClient;
    this.isLogedIn = false;
  }

  /**
   * login 함수 내부에서 네트워크 통신 로직을 넣어 코드를 작성하면 테스트하기 어렵다. (두 가지 일을 수행)
   * fetch("http://example.com/login/id+password").then((response) => response.json())
   */
  login(id, password) {
    if (!this.isLogedIn) {
      return this.userClient
        .login(id, password)
        .then((data) => (this.isLogedIn = true));
    }
  }
}

module.exports = UserService;
