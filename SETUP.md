# Construction RFI Generator - Setup Guide

## Quick Start (5 minutes)

### Prerequisites
1. Install **Node.js** from https://nodejs.org (version 18+)
2. Verify installation: `node --version` and `npm --version`

### Setup Steps
```bash
# 1. Navigate to the project folder
cd construction-rfi-generator

# 2. Install dependencies (this may take a few minutes)
npm install

# 3. Start the application
npm run dev
```

### Access the Application
- Open your browser to: **http://localhost:3000**
- You should see the RFI Assistant dashboard

### Demo Instructions
1. **Upload any PDF file** using drag & drop
2. **Fill in project details:**
   - Project Name: "Sunset Office Complex"  
   - RFI Number: "RFI-001"
   - Trade: "Electrical"
   - Urgency: "Medium"
3. **Click "Process RFI"** and watch the magic happen!

### Troubleshooting
- **Port 3000 in use?** The app will automatically use port 3001, 3002, etc.
- **Installation issues?** Delete `node_modules` folder and run `npm install` again
- **Browser issues?** Try Chrome, Safari, or Edge

### Demo Tips
- Try keywords like "electrical", "door", "hvac" for different scenarios
- The app works offline and has built-in fallbacks
- Processing takes 20-30 seconds to show realistic timing

**That's it! You now have a professional construction RFI demo running locally.** 🚀