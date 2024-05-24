<template>
  <div class="container">
    <div class="header"></div>
    <div class="main"></div>
    <div class="footer">
      <input type="text" />
      <button><Icon name="bi:caret-right-fill" /></button>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  .header {
    flex: 0;
  }
  .main {
    flex: 1;
  }
  .footer {
    flex: 0;
    display: flex;
    padding: 10px;
    input {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid transparent;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
    }
    button {
      background-color: transparent;
      color: #fff;
      border-style: solid;
      border-color: #fff;
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
    }
  }
}
</style>
