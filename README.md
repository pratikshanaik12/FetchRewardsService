# FetchRewardsService

Welcome to the FetchRewardsService! This Node.js service processes receipts and calculates reward points based on predefined criteria.

## Getting Started

Follow these instructions to get the FetchRewardsService running on your local machine for development and testing purposes.

### Prerequisites

Ensure Docker is installed on your system. For installation instructions, see the [official Docker documentation](https://docs.docker.com/get-docker/).

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/pratikshanaik12/FetchRewardsService.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd FetchRewardsService
    ```

3. **Build the Docker image:**

    ```sh
    docker build -t fetchrewardsservice .
    ```

4. **Run the Docker container:**

    ```sh
    docker run -dp 3000:3000 fetchrewardsservice
    ```

    The application will now be accessible at `http://localhost:3000`.

## API Reference

The service provides two primary endpoints:

### 1. Process Receipts

- **Endpoint**: `POST /api/receipts/process`
- **Description**: Processes a receipt and returns a JSON object with an ID.

    **Example Request Body**:

    ```json
    {
        "retailer": "Walgreens",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "08:13",
        "total": "2.65",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
            {"shortDescription": "Dasani", "price": "1.40"}
        ]
    }
    ```

    **Example Response**:

    ```json
    { "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
    ```

### 2. Get Points

- **Endpoint**: `GET /api/receipts/{id}/points`
- **Description**: Returns points associated with given receipt id.

    **Example Response**:

    ```json
    { "points": 28 }
    ```