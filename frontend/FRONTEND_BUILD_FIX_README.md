# Frontend build fix

Changes applied:

1. Replaced barrel imports from `@mui/icons-material` with direct icon imports such as:

```ts
import AddIcon from "@mui/icons-material/Add";
```

This reduces CRA/Webpack work during `react-scripts build`.

2. Updated Dockerfile build environment:

```dockerfile
ENV CI=false
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=4096
```

3. Added a build heartbeat in Dockerfile so Coolify does not fail because `react-scripts build` is silent for a long time.

After replacing your frontend with these files, run:

```powershell
npm run build
```

Then push to GitHub and redeploy in Coolify using Clear build cache / Redeploy without cache.

If it is still slow, downgrade CRA-compatible versions:

```powershell
npm uninstall @types/react-router-dom
npm install react@18.3.1 react-dom@18.3.1 --legacy-peer-deps
npm install -D typescript@4.9.5 @types/react@18.3.23 @types/react-dom@18.3.7 @types/node@20.19.0 @types/jest@29.5.12 --legacy-peer-deps
npm install --legacy-peer-deps
npm run build
```
