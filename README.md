# THN Church Website

Website for The HAvEN Nation Inc (THN Church), Ibadan.
React + Vite on the front end, with a small PHP API (`public/api/`) that powers the Admin panel, contact form and sign-up forms.

## Local development

You need Node 22+ and PHP 8+.

```bash
npm install
npm run api   # PHP API on http://localhost:8000
npm run dev   # site on http://localhost:5173
```

On first run the API creates `public/api/data.json` from `data.seed.json`.
To log in to `/admin` locally, create `public/api/auth.json`:

```bash
php -r 'echo json_encode(["password_hash" => password_hash("your-local-password", PASSWORD_DEFAULT)]);' > public/api/auth.json
```

## How deployment works

| Branch       | What happens                                                                 |
|--------------|-------------------------------------------------------------------------------|
| `main`       | Day-to-day work. Nothing is deployed.                                         |
| `production` | Every push builds the site in GitHub Actions and uploads `dist/` to cPanel over FTPS. |

To release:

```bash
git checkout production
git merge main
git push
```

You can also re-run a deploy any time from **GitHub → Actions → Deploy website on push → Run workflow**.

### Live data is never overwritten

The Admin panel saves content on the server in `api/data.json`, the admin password in `api/auth.json`, and form entries in `api/messages.json`, `visit_plans.json` and similar files. These files are:

- not in git (see `.gitignore`)
- excluded from every deploy (see `.github/workflows/deploy.yml`)
- blocked from direct download (see `public/api/.htaccess`)

On a brand-new server they're created once from the seed files: `data.seed.json` for content, and `auth.seed.json` for the password. The workflow generates `auth.seed.json` from the `ADMIN_PASSWORD` secret.

> Editing `data.seed.json` only affects a fresh server. To change live content, use the Admin panel.

### Required GitHub secrets

Set these in **Settings → Secrets and variables → Actions**:

| Secret           | Value                                                        |
|------------------|--------------------------------------------------------------|
| `FTP_HOST`       | Your cPanel server hostname, e.g. `server123.web-hosting.com` |
| `FTP_USERNAME`   | The FTP account, e.g. `deploy@havenation.org`                |
| `FTP_PASSWORD`   | That FTP account's password                                  |
| `ADMIN_PASSWORD` | The first password for `/admin` (change it after first login) |

See [DEPLOYMENT.md](DEPLOYMENT.md) for the cPanel setup steps.
