# AgentDM @ WWW 2027 — Workshop Website

The First Workshop on **Structured Data Mining with LLM Agents (AgentDM)**,
co-located with The ACM Web Conference 2027 · Dublin, Ireland · May 10–14, 2027.

Pure static site (HTML/CSS/JS, no build step) — ready for **GitHub Pages**.

```
index.html              ← page structure & static text (abstract, topics, CFP)
assets/js/config.js     ← ★ EDIT HERE: dates, organizers, speakers, PC, schedule, links
assets/js/main.js       ← rendering, countdown, animated background
assets/css/style.css    ← design
assets/img/             ← hero-bg.jpg, og-image.png (social preview), favicon.svg, people/
```

## Daily updates (no coding needed)

| What | Where |
|---|---|
| Change a deadline / mark it confirmed | `config.js → dates` (`status: "confirmed"`) |
| Open the submission portal | `config.js → links.submission` (OpenReview URL) |
| Add organizer photos | drop images in `assets/img/people/`, set `photo:` |
| Announce a keynote | add to `config.js → speakers` |
| Publish the PC | fill `pc`, set `showPC: true` |
| Contact email | `config.js → links.email` |
| Replace background | overwrite `assets/img/hero-bg.jpg` (≈2400×1400, dark) |

Passed deadlines are greyed out automatically; the hero countdown jumps to the next one.

---

## 部署到 GitHub Pages（中文步骤）

### 方案 A（推荐，学界最常见）：建一个 Organization
网址会是 `https://agentdm-workshop.github.io/`，不依附任何个人账号，方便多位组织者共同维护、年年复用。

1. 用你自己的 GitHub 账号登录（没有的话在 https://github.com/signup 注册，需邮箱验证）。
2. 右上角头像 → **Your organizations → New organization → Free**，名字填 `agentdm-workshop`（或 `agentdm2027`，需未被占用）。
3. 在该组织下 **New repository**，仓库名必须是 **`agentdm-workshop.github.io`**（= 组织名 + `.github.io`），设为 Public。
4. 上传本项目所有文件（见下方）。
5. 仓库 **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**。
6. 1–2 分钟后访问 `https://agentdm-workshop.github.io/`。
7. Organization → **People → Invite member**，把其他组织者加进来。

### 方案 B：放在个人账号下
新建仓库如 `agentdm-www2027`，同样开启 Pages，网址为 `https://<你的用户名>.github.io/agentdm-www2027/`。
（参考网站 `www-tfm-causal.github.io/www2026-workshop/` 就是 组织 + 子仓库 的形式。）

### 上传文件
- **网页拖拽**：仓库页面 → *Add file → Upload files* → 把解压后的文件夹**内部所有内容**（含 `assets/` 文件夹、`.nojekyll`）拖进去 → Commit。
  > Mac 默认隐藏 `.nojekyll`，按 `Cmd+Shift+.` 显示。漏掉它通常也能正常运行。
- **命令行**：
  ```bash
  cd agentdm-workshop
  git init && git add . && git commit -m "Initial AgentDM website"
  git branch -M main
  git remote add origin https://github.com/agentdm-workshop/agentdm-workshop.github.io.git
  git push -u origin main
  ```

### 可选：自定义域名
买域名（如 `agentdm.org`）→ Settings → Pages → Custom domain 填入 → 在域名商处加 CNAME 记录指向 `agentdm-workshop.github.io` → 勾选 *Enforce HTTPS*。

### 上线前检查清单
- [ ] `config.js` 中 `links.email` 替换为真实联系邮箱（当前为占位）
- [ ] 日期均为 *tentative*，待 WWW 2027 官方 workshop 时间线公布后更新
- [ ] 讲者只在确认后再列出（当前显示 “To be announced”）
- [ ] PC 名单在成员正式确认后再开启 `showPC`
