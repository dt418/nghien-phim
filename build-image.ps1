# Read .env file and create a hashtable of environment variables
$envContent = Get-Content -Path "./.env" -ErrorAction SilentlyContinue
$envVars = @{}

if ($envContent) {
    foreach ($line in $envContent) {
        if ($line.Trim() -and !$line.StartsWith('#')) {
            $key, $value = $line.Split('=', 2)
            $envVars[$key.Trim()] = $value.Trim()
        }
    }
}

# Build the docker command with environment variables
$dockerCommand = @(
    "docker build"
    "-t nghien-phim:latest"
    "--build-arg UPSTASH_REDIS_REST_URL=$($envVars['UPSTASH_REDIS_REST_URL'])"
    "--build-arg UPSTASH_REDIS_REST_TOKEN=$($envVars['UPSTASH_REDIS_REST_TOKEN'])"
    "--build-arg CLOUDINARY_CLOUD_NAME=$($envVars['CLOUDINARY_CLOUD_NAME'])"
    "--build-arg NEXT_PUBLIC_BASE_URL=$($envVars['NEXT_PUBLIC_BASE_URL'])"
    "--no-cache"
    "."
) -join " "

# Execute the docker build command
Invoke-Expression $dockerCommand
