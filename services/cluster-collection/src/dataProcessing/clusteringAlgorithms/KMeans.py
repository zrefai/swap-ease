from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.cluster import KMeans

MIN_CLUSTERS = 10
MAX_CLUSTERS = 21

kmeans_kwargs = {
    'init': 'random',
    'n_init': 50,
    'max_iter': 500
}

# TODO: Low collection counts do not need high number of clusters

def getKMeanLabels(dataFrame) -> list[int]:
    bestScore = -1
    labels: list[int] = []

    scaledDataFrame = StandardScaler().fit_transform(dataFrame)
    
    print("Generating labels for clusters...")
    
    for c in range(MIN_CLUSTERS, MAX_CLUSTERS):
        kmeans = KMeans(n_clusters=c, **kmeans_kwargs)
        kmeans.fit(scaledDataFrame)
        score = silhouette_score(scaledDataFrame, kmeans.labels_)

        if score > bestScore:
            bestScore = score
            labels = list(kmeans.labels_)

    return labels
