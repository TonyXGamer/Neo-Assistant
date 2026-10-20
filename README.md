# Neo — Personal AI Assistant

Neo is a personal AI assistant project currently under development. It features an interactive dashboard that displays the current time, network connectivity status, battery level, and real-time CPU and RAM usage.

The goal of this project is to gradually develop Neo into a more capable personal AI assistant through the integration of additional features and automation tools.

## Features

- **Live Clock:** Displays the current time.
- **Network Status:** Shows the browser's reported network connectivity.
- **Battery Monitor:** Displays battery percentage when supported by the browser.
- **CPU Monitor:** Retrieves CPU usage from a Python backend.
- **RAM Monitor:** Retrieves RAM usage from a Python backend.
- **Interactive Dashboard:** Displays system information through a custom HTML, CSS, and JavaScript interface.

## Technologies Used

- **Python** — Backend programming
- **Flask** — Web server and API endpoints
- **psutil** — System performance monitoring
- **Flask-CORS** — Communication between the dashboard and backend
- **HTML** — Dashboard structure
- **CSS** — Dashboard styling and animations
- **JavaScript** — Dynamic updates and API requests

## Getting Started

### Requirements

- Python 3.10 or newer
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/Neo-Assistant.git
   ```

2. Navigate into the project folder:

   ```bash
   cd Neo-Assistant
   ```

3. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

4. Activate the virtual environment (Windows PowerShell):

   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

5. Install the dependencies:

   ```bash
   python -m pip install -r requirements.txt
   ```

6. Start the Python backend:

   ```bash
   python backend.py
   ```

7. Open `dashboard/index.html` in your browser.

   Keep the Python backend running while using Neo's system monitoring features.