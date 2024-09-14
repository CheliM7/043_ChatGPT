
def calculate_weighted_vote_percentage(public_polls, candidates, public_poll_weight=0.7, db_poll_weight=0.3):
    """
    Calculate the weighted vote percentage based on public polls and database votes.

    :param public_polls: Dictionary containing public poll results.
    :param candidates: List of candidates retrieved from the database.
    :param public_poll_weight: Weight assigned to public poll votes.
    :param db_poll_weight: Weight assigned to database votes.
    :return: A dictionary with candidates' names and their weighted vote percentage.
    """
    # Copy of public_polls to avoid modifying the original dictionary
    updated_polls = public_polls.copy()

    # Total votes from public_polls and database votes
    total_public_votes = sum(public_polls.values())
    total_db_votes = 0

    # Iterate over the candidates and update the vote count
    for candidate in candidates:
        name = candidate.get('name')
        votes = candidate.get('vote_count', 0)  # Default to 0 if votes not found
        total_db_votes += votes

        if name in updated_polls:
            updated_polls[name] += votes  # Add database votes to public poll values
        else:
            updated_polls[name] = votes  # Add new candidates if not already in public_polls

    # Calculate total weighted votes
    total_weighted_votes = (public_poll_weight * total_public_votes) + (db_poll_weight * total_db_votes)

    # Calculate the weighted percentages
    weighted_results = {}
    for name, votes in updated_polls.items():
        public_votes = public_polls.get(name, 0)
        db_votes = votes - public_votes

        # Calculate weighted votes
        weighted_votes = (public_poll_weight * public_votes) + (db_poll_weight * db_votes)

        # Calculate percentage
        weighted_percentage = (weighted_votes / total_weighted_votes) * 100
        weighted_results[name] = round(weighted_percentage, 2)

    return weighted_results


def calculate_final_win_percentage(weighted_results, sentiments):
    """
    Calculate the final win percentage by averaging the weighted results and sentiment values.

    :param weighted_results: Dictionary of weighted vote percentages from the database and public polls.
    :param sentiments: Dictionary of positive sentiment values for each candidate.
    :return: A dictionary with the final win percentages for each candidate.
    """
    final_results = {}

    for name in weighted_results:
        if name == 'total_positive':
            continue  # Skip the total positive sentiment value
        weighted_vote = weighted_results[name]
        sentiment = sentiments.get(name, 0)  # Get the sentiment value, default to 0 if not present

        # Calculate the average of the weighted vote percentage and the sentiment percentage
        final_win_percentage = (weighted_vote + sentiment) / 2

        final_results[name] = round(final_win_percentage, 2)

    return final_results
