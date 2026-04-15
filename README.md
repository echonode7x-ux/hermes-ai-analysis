# ai-analysis

一个面向 **一人公司 / 低成本 / AI Coding 驱动机会** 的研究型信息站。

## 当前定位
- 不做重 SaaS
- 优先做成 **Web 展示型研究平台**
- 所有部署目标默认是 **Cloudflare Pages**
- 内容先维护在本地 JSON，前端静态发布

## 项目结构
- `site/`：站点源文件
- `site/data/research.json`：当前调研数据
- `dist/`：构建输出
- `scripts/build.mjs`：静态构建脚本
- `wrangler.toml`：Cloudflare Pages 配置

## 本地使用
```bash
npm run build
npm run preview
```

## Cloudflare 部署
直接连接 GitHub 仓库到 Cloudflare Pages：
- Build command: `npm run build`
- Build output directory: `dist`

也可以使用 Wrangler：
```bash
npx wrangler pages deploy dist
```

## Git 规则
- Conventional Commits
- `main` 作为默认分支
- push early, push often
- 需要并行任务时使用 `git worktree`
