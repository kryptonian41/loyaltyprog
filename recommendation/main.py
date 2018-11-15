import pandas as pd
from sklearn.model_selection import train_test_split
import Recommenders as Recommenders
import sys

df = pd.read_csv('./recommendation/dataset_fin.csv', encoding='latin-1')
train_data, test_data = train_test_split(df, test_size=0.20, random_state=0)
model = Recommenders.item_similarity_recommender_py()
model.create(train_data, 'user_id', 'prod_name')


def recommend(username, prod):
    all_items = model.get_all_items_train_data()
    prodList = []
    prodList.append(prod)
    cm = model.construct_cooccurence_matrix(prodList, all_items)
    top = model.generate_top_recommendations(username, cm, all_items, prod)
    top_items = top.iloc[:, [1]]
    print(top_items.to_json())


recommend(sys.argv[1], sys.argv[2])
