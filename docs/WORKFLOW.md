# Workflow Baseline

## Git rules
- default branch: `main`
- commit style: Conventional Commits
- push early, push often
- use short-lived feature branches

## Worktree rule
Create parallel branches in `../_worktrees/<branch-name>`.

Example:
```bash
git worktree add ../_worktrees/feature-example -b feature/example
```
