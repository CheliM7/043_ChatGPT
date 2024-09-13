from transformers import pipeline

# Sentiment analysis pipeline
sentiment_model = pipeline("sentiment-analysis")

def analyze_text(text, candidate_name):
    # Analyze sentiment of text mentioning the candidate
    if candidate_name.lower() in text.lower():
        sentiment = sentiment_model(text)
        return sentiment[0]['label'], sentiment[0]['score']
    else:
        return "No mention", 0.0

# Test case for analyze_text function
text = "I think Anura has a great chance of winning the election this time."
candidate_name = "Ranil Wickramasinghe"

# Call the analyze_text function
sentiment_label, sentiment_score = analyze_text(text, candidate_name)

# Print the results
print(f"Sentiment Label: {sentiment_label}, Sentiment Score: {sentiment_score:.4f}")