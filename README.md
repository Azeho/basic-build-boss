# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0bd7d773-c680-4f57-9f91-d136ca0b0746

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0bd7d773-c680-4f57-9f91-d136ca0b0746) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0bd7d773-c680-4f57-9f91-d136ca0b0746) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Disk Space Management Tools

This repository includes disk space analysis and cleanup tools for Linux servers:

### Quick Disk Check (`quick-disk-check.sh`)

A fast, non-interactive script that provides an instant overview of disk usage:

```bash
chmod +x quick-disk-check.sh
./quick-disk-check.sh
```

Shows:
- Current disk usage across all partitions
- Log files size and largest logs
- Package manager caches (APT, YUM, npm, etc.)
- Temporary files size
- Top 10 largest directories
- Top 10 largest files (>100MB)
- Docker usage (if installed)

### Full Disk Cleanup Tool (`disk-cleanup.sh`)

An interactive menu-driven script for comprehensive analysis and cleanup:

```bash
chmod +x disk-cleanup.sh
sudo ./disk-cleanup.sh
```

Features:
- **Quick Analysis**: Fast overview of disk usage
- **Full Analysis**: Detailed scan of all directories and files
- **Interactive Cleanup**: Safe cleanup options for caches, logs, Docker, etc.
- **Report Generation**: Creates detailed reports for record-keeping

Supports:
- OpenVZ/Virtuozzo containers (ploop devices)
- APT/YUM/DNF package managers
- Docker cleanup
- Log rotation
- Temporary files cleanup
- And more...

### Documentation

See [DISK-CLEANUP-GUIDE.md](DISK-CLEANUP-GUIDE.md) for detailed documentation including:
- What is ploop11004p1?
- Common causes of disk space issues
- Emergency cleanup procedures
- Prevention strategies
- Troubleshooting guide
