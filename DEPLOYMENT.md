# Deploying THN to Namecheap cPanel

You do this once. After that, every push to the `production` branch deploys automatically.

## 1. Point the domain at the hosting

If `havenation.org` is registered at Namecheap on the same account, go to **Domain List → Manage → Nameservers** and pick **Namecheap Web Hosting DNS**.

If it's registered elsewhere, point its nameservers to the ones in your hosting welcome email (e.g. `dns1.namecheaphosting.com`, `dns2.namecheaphosting.com`).

DNS can take a few hours to update.

## 2. Find the website folder

In cPanel, open **Domains**:

- If havenation.org is the **main domain** of the hosting account, its folder is `public_html`.
- If it's an **addon domain**, its folder is the one shown in the "Document Root" column, e.g. `public_html/havenation.org` or `havenation.org`.

Write this folder down. You need it in step 4.

## 3. Back up or clear anything already in that folder

Open **File Manager** and go to that folder.

- If an old site is there, select everything, **Compress** it into a `.zip` backup and download it.
- Then delete the old files.
- Leave `.well-known` and `cgi-bin` if they're there.

## 4. Create an FTP account just for deployments

1. In cPanel go to **FTP Accounts**.
2. Fill in:
   - **Log In:** `deploy`, which becomes `deploy@havenation.org`
   - **Password:** use the generator and save the password somewhere safe
   - **Directory:** the website folder from step 2, exactly. cPanel pre-fills `public_html/deploy`, so **delete the `/deploy` part**.
   - **Quota:** Unlimited
3. Click **Create FTP Account**.

## 5. Find the FTP server hostname

On the FTP Accounts page, scroll to your new account and click **Configure FTP Client**. Copy the **FTP Server** value, which looks like `server123.web-hosting.com`.

Use this server hostname, not `ftp.havenation.org`. The deploy uses encrypted FTPS, and the server's certificate is issued for the server hostname.

## 6. Turn on SSL (HTTPS)

1. In cPanel open **SSL/TLS Status**.
2. Tick `havenation.org` and `www.havenation.org`, then click **Run AutoSSL**.

Wait until both show a green padlock. The site forces HTTPS, so it needs a valid certificate.

## 7. Check the PHP version

Open **Select PHP Version** (or **MultiPHP Manager**) and set the domain to **PHP 8.1 or newer**.

## 8. Add the GitHub secrets

In the repo go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Name             | Value                                                         |
|------------------|---------------------------------------------------------------|
| `FTP_HOST`       | the server hostname from step 5                               |
| `FTP_USERNAME`   | `deploy@havenation.org`                                       |
| `FTP_PASSWORD`   | the password from step 4                                      |
| `ADMIN_PASSWORD` | a strong first password for the `/admin` page                 |

## 9. Deploy

From your computer:

```bash
git checkout -b production
git push -u origin production
```

Then watch **GitHub → Actions**. The first run uploads everything and takes a few minutes. Later runs only upload changed files.

## 10. Check the live site

- **Homepage:** `https://havenation.org` loads.
- **Deep links:** `https://havenation.org/events` opens directly. If you get a 404, the `.htaccess` didn't upload; see troubleshooting.
- **Data files are private:** `https://havenation.org/api/data.json` must show **403 Forbidden**.
- **Admin:** log in at `https://havenation.org/admin` with your `ADMIN_PASSWORD`, then **change the password** from the Admin panel straight away.
- **Contact form:** send a test message and check it arrives at `info@havenation.org`.

## 11. Make sure the form emails arrive

The contact and sign-up forms send email with PHP from `noreply@havenation.org`.

- **Email Deliverability:** in cPanel open **Email Deliverability**. If SPF or DKIM shows a problem, click **Repair**.
- **Inbox:** create the `info@havenation.org` mailbox in **Email Accounts** if it doesn't exist yet.

## Troubleshooting

| Problem                              | Fix                                                                          |
|--------------------------------------|------------------------------------------------------------------------------|
| Action fails to connect / TLS error  | Check `FTP_HOST` is the server hostname. As a last resort, change `protocol: ftps` to `protocol: ftp` in `.github/workflows/deploy.yml`. |
| Files land in the wrong folder       | The FTP account's directory is wrong. Edit it in **FTP Accounts** (step 4).   |
| `/events` etc. give 404              | In File Manager open **Settings** and tick **Show Hidden Files**. Check `.htaccess` exists in the website folder. |
| "Connection Error" on the site       | Visit `/api/get_site_data.php`. A PHP error means the PHP version is too old (step 7). |
| Admin login says "not set up"        | `ADMIN_PASSWORD` was missing when you deployed. Add it, then re-run the workflow. |
| Forgot the admin password            | In File Manager delete `api/auth.json`, then re-run the workflow. It's recreated from `ADMIN_PASSWORD`. |
| Need to restore content              | `api/data.json.bak` is the version before the last Admin save.               |
