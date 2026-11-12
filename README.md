# 反应链 · Zeabur 部署包

这是一个纯静态部署包，入口是 `index.html`，包含：

- `index.html`
- `game.js`
- `cards.js`
- `content.js`
- `audio.js`

`server.js` 只负责静态文件服务，不包含联机 / WebSocket。以后要加联机，可以在同一个服务里扩展 WebSocket。

## 本地运行

```powershell
npm start
```

打开 `http://localhost:8080/`。

也可以：

```powershell
docker build -t reaction-chain .
docker run --rm -p 8080:8080 reaction-chain
```

## 部署到 Zeabur

### 方式一：GitHub 导入

1. 把这个文件夹的内容推到 GitHub 仓库。
2. Zeabur → New Project → Deploy from GitHub。
3. 如果仓库根目录不是本文件夹，把 **Root Directory** 设为 `Zeabur部署包`（或你实际存放的目录名）。
4. Zeabur 会识别 `Dockerfile`；如果没有识别，部署方式选 **Dockerfile**。
5. 端口为 `8080`，不需要添加环境变量。
6. 区域建议选 **Hong Kong** 或 **Singapore**。
7. 部署完成后打开 Zeabur 提供的 `*.zeabur.app` 域名。

### 方式二：Dockerfile 部署

Zeabur 项目里选择 Dockerfile 部署，根目录指向本文件夹即可。

## 注意

- 默认 `*.zeabur.app` 域名是公开访问的。
- 国内访问速度和稳定性取决于所选区域，不保证；长期给国内玩家用建议绑定自定义域名并考虑备案。
- 当前版本不需要数据库、环境变量或构建命令。
