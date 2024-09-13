from dotenv import load_dotenv
import os
from langchain_nvidia_ai_endpoints import ChatNVIDIA


load_dotenv()  # Load environment variables from .env file
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

# instantiate the model
model = ChatNVIDIA(model="meta/llama-3.1-405b-instruct")

# Names of the politicians to extract main points from the article
names = ["Anura Kumara Dissanayake", "Ranil Wickramasinghe", "Sajith Premadasa"]

# function to extract main points related to the politicians from the article
def extract_main_points(article, names):
    main_points = {}

    for name in names:
        prompt = f"summarize main points related to {name} from the following article:\n\n{article}"

        # Use the invoke method (simulated, adjust this part as needed)
        response = model.invoke(prompt)

        # Access the output and store in the dictionary
        # Assuming "output" contains the summarized bullet points
        main_points[name] = response["output"] if "output" in response else response

    return main_points
