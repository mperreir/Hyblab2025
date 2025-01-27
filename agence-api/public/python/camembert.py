import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import tkinter as tk
import numpy as np

# Données extraites du graphique
regions = [
    "MORBIHAN",
    "ILLE-ET-VILAINE",
    "FINISTÈRE",
    "CÔTES D'ARMOR",
    "VENDÉE",
    "SARTHE",
    "MAYENNE",
    "MAINE-ET-LOIRE",
    "LOIRE-ATLANTIQUE",
]

categories = [
    "Agriculteurs exploitants",
    "Artisans, commerçants, chefs d'entreprise",
    "Cadres et professions intellectuelles supérieures",
    "Professions intermédiaires",
    "Employés",
    "Ouvriers",
]

values = [
    [2.3, 8.4, 12.3, 25.2, 27.4, 24.4],  # MORBIHAN
    [2, 5.7, 18.8, 26.7, 25.6, 21.2],   # ILLE-ET-VILAINE
    [2.1, 6.9, 14.3, 26.7, 27.9, 22.1],   # FINISTÈRE
    [4.2, 8.1, 11.4, 24.0, 26.9, 25.5],  # CÔTES D'ARMOR
    [2.8, 7.5, 9.8, 23.3, 26.1, 30.5],    # VENDÉE
    [2.3, 5.7, 11.9, 24.9, 28.0, 27.2],   # SARTHE
    [5.5, 5.7, 10.4, 24.0, 24.5, 29.9],   # MAYENNE
    [2.4, 6.2, 13.5, 25.4, 26.5, 26.0],   # MAINE-ET-LOIRE
    [1.2, 6.1, 19.8, 27.9, 24.9, 20.1],   # LOIRE-ATLANTIQUE
]

# Créer une application tkinter pour afficher les graphiques avec un curseur
root = tk.Tk()
root.title("Diagrammes circulaires")

# Définir des couleurs alternées pastel et vives
colors = ["#FFB3BA", "#FF5733", "#FFDFBA", "#FFC300", "#FFFFBA", "#DAF7A6", "#BAFFC9", "#33FF57", "#BAE1FF", "#3380FF", "#D5BAFF", "#8333FF"]

# Créer une figure pour les graphiques
fig, axes = plt.subplots(3, 3, figsize=(20, 20))

for i, ax in enumerate(axes.flatten()):
    if i < len(regions):
        def custom_autopct(pct):
            return ('%1.1f%%' % pct) if pct >= 4 else ''

        wedges, texts, autotexts = ax.pie(
            values[i],
            labels=None,
            autopct=custom_autopct,
            startangle=90,
            pctdistance=0.6,  # Ajustement pour centrer les étiquettes
            colors=colors[:len(values[i])]  # Appliquer les couleurs alternées
        )

        # Ajuster les étiquettes inférieures à 4% en dehors du camembert
        for j, wedge in enumerate(wedges):
            if values[i][j] / sum(values[i]) * 100 < 4:
                angle = (wedge.theta2 + wedge.theta1) / 2
                x = 1.2 * np.cos(np.radians(angle))
                y = 1.2 * np.sin(np.radians(angle))
                ax.text(x, y, f"{values[i][j]}%", ha='center', va='center', fontsize=10, bbox=dict(facecolor='white', edgecolor='none', alpha=0.7))

        # Centrer les étiquettes restantes correctement dans les parts
        for autotext in autotexts:
            autotext.set_horizontalalignment('center')
            autotext.set_verticalalignment('center')

        ax.set_title(regions[i], fontsize=14, pad=10)
    else:
        ax.axis('off')  # Désactiver les axes inutilisés

# Ajouter une légende commune en dessous de tous les graphiques avec contours pour les carrés de couleurs
fig.legend(
    wedges,
    categories,
    title="Catégories",
    loc="lower center",
    ncol=3,
    frameon=True,
    fontsize=12,
    fancybox=True,
    edgecolor="black"
)
plt.tight_layout(rect=[0, 0.1, 1, 0.95])

# Ajouter un canevas de défilement
canvas = FigureCanvasTkAgg(fig, master=root)
canvas_widget = canvas.get_tk_widget()
canvas_widget.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

# Ajouter une barre de défilement verticale
scrollbar = tk.Scrollbar(root, orient=tk.VERTICAL, command=canvas_widget.yview)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
canvas_widget.configure(yscrollcommand=scrollbar.set)

root.mainloop()
