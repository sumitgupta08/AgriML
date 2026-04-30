# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy your requirements file first to optimize the build
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all your project files into the container
COPY . .

# Expose the port (Vercel projects often use 3000 or 5000)
EXPOSE 5000

# Start your application
CMD ["python", "app.py"]