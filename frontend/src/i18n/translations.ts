export const animations = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
  
  .animate-slide-up-delay {
    animation: slide-up 0.6s ease-out 0.2s both;
  }
  
  .animate-slide-up-delay-2 {
    animation: slide-up 0.6s ease-out 0.4s both;
  }
  
  .animate-fade-in-up {
    animation: slide-up 0.8s ease-out 0.3s both;
  }
  
  .animate-fade-in-up-delay {
    animation: slide-up 0.8s ease-out 0.5s both;
  }
`;

export const translations = {
  en: {
    // Header & Navigation
    home: "Home",
    dashboard: "Dashboard",
    write: "Write",
    admin: "Admin",
    login: "Login",
    register: "Sign Up",
    logout: "Logout",
    profile: "My Profile",
    adminArea: "Admin Area",
    
    // Auth
    welcomeBack: "Welcome Back",
    signInAccount: "Sign in to your LumaPress account",
    createAccount: "Create Account",
    joinLumaPress: "Join the LumaPress community",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    yourEmail: "your.email@example.com",
    yourPassword: "Your password",
    yourUsername: "Your username",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    alreadyHaveAccount: "Already have an account?",
    signInNow: "Sign in now",
    signUpNow: "Sign up now",
    signIn: "Sign In",
    agreeToTerms: "I agree to the",
    and: "and",
    creating: "Creating",
    registrationFailed: "Registration failed",
    
    // Dashboard
    published: "Published",
    drafts: "Drafts",
    yourCreativeSpace: "Your creative space awaits",
    writeNewPost: "Write New Post",
    startMasterpiece: "Start your next masterpiece",
    yourPublishedStories: "Your published stories",
    worksInProgress: "Works in progress",
    recentDrafts: "Recent Drafts",
    newDraft: "New Draft",
    lastEdited: "Last edited",
    publishedPosts: "Published Posts",
    yourPublishedPosts: "Your Published Posts",
    viewAll: "View All",
    noDraftsYet: "No drafts yet",
    noDrafts: "No drafts yet",
    createFirstDraft: "Create your first draft",
    noPublishedYet: "No published posts yet",
    noPublishedPosts: "No published posts yet",
    publishFirstPost: "Publish your first post",
    writeFirstPost: "Write your first post",
    shareThoughts: "Share your thoughts with the world!",
    posts: "posts",
    refresh: "Refresh",
    retry: "Retry",
    startWritingStory: "Start writing your amazing story",
    
    // Footer
    aboutPlatform: "A professional blog platform for creators and content creators. Share your stories with the world.",
    platform: "Platform",
    legal: "Legal",
    legalNotice: "Legal Notice",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    legalRequests: "Legal Requests",
    support: "Support",
    contact: "Contact",
    writeArticle: "Write Article",
    allRightsReserved: "All rights reserved",
    operatedBy: "Operated by ESE-Tech Solutions GmbH • Berlin, Germany",
    
    // Admin
    userManagement: "User Management",
    contentManagement: "Content Management",
    platformSettings: "Platform Settings",
    
    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    // Blog
    readMore: "Read More",
    author: "Author",
    publishedOn: "Published on",
    tags: "Tags",
    
    // Editor
    createNewPost: "Create New Post",
    shareYourStory: "Share your story with the world",
    enterPostTitle: "Enter your post title...",
    link: "Link",
    startWriting: "Start writing your amazing post...",
    markdownSupport: "You can use Markdown formatting",
    boldText: "bold text",
    italicText: "italic text",
    headings: "headings",
    links: "links",
    markdownSupported: "Supports Markdown formatting",
    characters: "characters",
    readyToPublish: "Ready to publish?",
    saving: "Saving",
    saveDraft: "Save Draft",
    publishing: "Publishing",
    publish: "Publish",
    
    // Site Info
    tagline: "Professional blog for creators",
    description: "Where your words shine bright"
  },
  
  de: {
    // Header & Navigation
    home: "Startseite",
    dashboard: "Dashboard",
    write: "Schreiben",
    admin: "Admin",
    login: "Anmelden",
    register: "Registrieren",
    logout: "Abmelden",
    profile: "Mein Profil",
    adminArea: "Admin-Bereich",
    
    // Auth
    welcomeBack: "Willkommen zurück",
    signInAccount: "Melden Sie sich in Ihrem LumaPress-Konto an",
    createAccount: "Konto erstellen",
    joinLumaPress: "Treten Sie der LumaPress-Community bei",
    email: "E-Mail-Adresse",
    password: "Passwort",
    confirmPassword: "Passwort bestätigen",
    username: "Benutzername",
    yourEmail: "ihre.email@beispiel.de",
    yourPassword: "Ihr Passwort",
    yourUsername: "Ihr Benutzername",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    noAccount: "Noch kein Konto?",
    haveAccount: "Bereits ein Konto?",
    alreadyHaveAccount: "Bereits ein Konto?",
    signInNow: "Jetzt anmelden",
    signUpNow: "Jetzt registrieren",
    signIn: "Anmelden",
    agreeToTerms: "Ich stimme den",
    and: "und",
    creating: "Erstellen",
    registrationFailed: "Registrierung fehlgeschlagen",
    
    // Dashboard
    published: "Veröffentlicht",
    drafts: "Entwürfe",
    yourCreativeSpace: "Ihr kreativer Raum wartet",
    writeNewPost: "Neuen Beitrag schreiben",
    startMasterpiece: "Beginnen Sie Ihr nächstes Meisterwerk",
    yourPublishedStories: "Ihre veröffentlichten Geschichten",
    worksInProgress: "Arbeiten in Bearbeitung",
    recentDrafts: "Neueste Entwürfe",
    newDraft: "Neuer Entwurf",
    lastEdited: "Zuletzt bearbeitet",
    publishedPosts: "Veröffentlichte Beiträge",
    yourPublishedPosts: "Ihre veröffentlichten Beiträge",
    viewAll: "Alle anzeigen",
    noDraftsYet: "Noch keine Entwürfe",
    noDrafts: "Noch keine Entwürfe",
    createFirstDraft: "Erstellen Sie Ihren ersten Entwurf",
    noPublishedYet: "Noch keine veröffentlichten Beiträge",
    noPublishedPosts: "Noch keine veröffentlichten Beiträge",
    publishFirstPost: "Veröffentlichen Sie Ihren ersten Beitrag",
    writeFirstPost: "Schreiben Sie Ihren ersten Beitrag",
    shareThoughts: "Teilen Sie Ihre Gedanken mit der Welt!",
    posts: "Beiträge",
    refresh: "Aktualisieren",
    retry: "Erneut versuchen",
    startWritingStory: "Beginnen Sie mit dem Schreiben Ihrer Geschichte",
    
    // Footer
    aboutPlatform: "Eine professionelle Blog-Plattform für Kreative und Content-Ersteller. Teilen Sie Ihre Geschichten mit der Welt.",
    platform: "Plattform",
    legal: "Rechtliches",
    legalNotice: "Impressum",
    privacyPolicy: "Datenschutz",
    termsOfService: "Nutzungsbedingungen",
    legalRequests: "Rechtliche Anfragen",
    support: "Support",
    contact: "Kontakt",
    writeArticle: "Artikel schreiben",
    allRightsReserved: "Alle Rechte vorbehalten",
    operatedBy: "Betrieben von ESE-Tech Solutions GmbH • Berlin, Deutschland",
    
    // Admin
    userManagement: "Benutzerverwaltung",
    contentManagement: "Inhaltsverwaltung",
    platformSettings: "Plattform-Einstellungen",
    
    // Common
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    loading: "Laden...",
    error: "Fehler",
    success: "Erfolg",
    
    // Blog
    readMore: "Weiterlesen",
    author: "Autor",
    publishedOn: "Veröffentlicht am",
    tags: "Tags",
    
    // Editor
    createNewPost: "Neuen Beitrag erstellen",
    shareYourStory: "Teilen Sie Ihre Geschichte mit der Welt",
    enterPostTitle: "Geben Sie Ihren Beitragstitel ein...",
    link: "Link",
    startWriting: "Beginnen Sie mit dem Schreiben Ihres großartigen Beitrags...",
    markdownSupport: "Sie können Markdown-Formatierung verwenden",
    boldText: "fetter Text",
    italicText: "kursiver Text",
    headings: "Überschriften",
    links: "Links",
    markdownSupported: "Unterstützt Markdown-Formatierung",
    characters: "Zeichen",
    readyToPublish: "Bereit zum Veröffentlichen?",
    saving: "Speichern",
    saveDraft: "Entwurf speichern",
    publishing: "Veröffentlichen",
    publish: "Veröffentlichen",
    
    // Site Info
    tagline: "Professioneller Blog für Kreative",
    description: "Wo Ihre Worte strahlen"
  },
  
  fr: {
    // Header & Navigation
    home: "Accueil",
    dashboard: "Tableau de bord",
    write: "Écrire",
    admin: "Admin",
    login: "Connexion",
    register: "S'inscrire",
    logout: "Déconnexion",
    profile: "Mon profil",
    adminArea: "Espace Admin",
    
    // Auth
    welcomeBack: "Bon retour",
    signInAccount: "Connectez-vous à votre compte LumaPress",
    createAccount: "Créer un compte",
    joinLumaPress: "Rejoignez la communauté LumaPress",
    email: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    username: "Nom d'utilisateur",
    yourEmail: "votre.email@exemple.fr",
    yourPassword: "Votre mot de passe",
    yourUsername: "Votre nom d'utilisateur",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié?",
    noAccount: "Pas de compte?",
    haveAccount: "Déjà un compte?",
    alreadyHaveAccount: "Déjà un compte?",
    signInNow: "Se connecter maintenant",
    signUpNow: "S'inscrire maintenant",
    signIn: "Se connecter",
    agreeToTerms: "J'accepte les",
    and: "et",
    creating: "Création",
    registrationFailed: "Échec de l'inscription",
    
    // Dashboard
    published: "Publié",
    drafts: "Brouillons",
    yourCreativeSpace: "Votre espace créatif vous attend",
    writeNewPost: "Écrire un nouvel article",
    startMasterpiece: "Commencez votre prochain chef-d'œuvre",
    yourPublishedStories: "Vos histoires publiées",
    worksInProgress: "Travaux en cours",
    recentDrafts: "Brouillons récents",
    newDraft: "Nouveau brouillon",
    lastEdited: "Dernière modification",
    publishedPosts: "Articles publiés",
    yourPublishedPosts: "Vos articles publiés",
    viewAll: "Voir tout",
    noDraftsYet: "Aucun brouillon encore",
    noDrafts: "Aucun brouillon encore",
    createFirstDraft: "Créez votre premier brouillon",
    noPublishedYet: "Aucun article publié encore",
    noPublishedPosts: "Aucun article publié encore",
    publishFirstPost: "Publiez votre premier article",
    writeFirstPost: "Écrivez votre premier article",
    shareThoughts: "Partagez vos pensées avec le monde!",
    posts: "articles",
    refresh: "Actualiser",
    retry: "Réessayer",
    startWritingStory: "Commencez à écrire votre histoire",
    
    // Footer
    aboutPlatform: "Une plateforme de blog professionnelle pour les créateurs et créateurs de contenu. Partagez vos histoires avec le monde.",
    platform: "Plateforme",
    legal: "Juridique",
    legalNotice: "Mentions légales",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    legalRequests: "Demandes juridiques",
    support: "Support",
    contact: "Contact",
    writeArticle: "Écrire un article",
    allRightsReserved: "Tous droits réservés",
    operatedBy: "Exploité par ESE-Tech Solutions GmbH • Berlin, Allemagne",
    
    // Admin
    userManagement: "Gestion des utilisateurs",
    contentManagement: "Gestion du contenu",
    platformSettings: "Paramètres de la plateforme",
    
    // Common
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    
    // Blog
    readMore: "Lire la suite",
    author: "Auteur",
    publishedOn: "Publié le",
    tags: "Tags",
    
    // Editor
    createNewPost: "Créer un nouvel article",
    shareYourStory: "Partagez votre histoire avec le monde",
    enterPostTitle: "Entrez le titre de votre article...",
    link: "Lien",
    startWriting: "Commencez à écrire votre article extraordinaire...",
    markdownSupport: "Vous pouvez utiliser le formatage Markdown",
    boldText: "texte en gras",
    italicText: "texte en italique",
    headings: "titres",
    links: "liens",
    markdownSupported: "Prend en charge le formatage Markdown",
    characters: "caractères",
    readyToPublish: "Prêt à publier?",
    saving: "Sauvegarde",
    saveDraft: "Sauvegarder le brouillon",
    publishing: "Publication",
    publish: "Publier",
    
    // Site Info
    tagline: "Blog professionnel pour créateurs",
    description: "Où vos mots brillent"
  },
  
  es: {
    // Header & Navigation
    home: "Inicio",
    dashboard: "Panel",
    write: "Escribir",
    admin: "Admin",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    profile: "Mi perfil",
    adminArea: "Área de Admin",
    
    // Auth
    welcomeBack: "Bienvenido de nuevo",
    signInAccount: "Inicia sesión en tu cuenta LumaPress",
    createAccount: "Crear cuenta",
    joinLumaPress: "Únete a la comunidad LumaPress",
    email: "Dirección de correo",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    username: "Nombre de usuario",
    yourEmail: "tu.email@ejemplo.com",
    yourPassword: "Tu contraseña",
    yourUsername: "Tu nombre de usuario",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tienes cuenta?",
    haveAccount: "¿Ya tienes cuenta?",
    alreadyHaveAccount: "¿Ya tienes cuenta?",
    signInNow: "Iniciar sesión ahora",
    signUpNow: "Registrarse ahora",
    signIn: "Iniciar sesión",
    agreeToTerms: "Acepto los",
    and: "y",
    creating: "Creando",
    registrationFailed: "Registro fallido",
    
    // Dashboard
    published: "Publicado",
    drafts: "Borradores",
    yourCreativeSpace: "Tu espacio creativo te espera",
    writeNewPost: "Escribir nueva publicación",
    startMasterpiece: "Comienza tu próxima obra maestra",
    yourPublishedStories: "Tus historias publicadas",
    worksInProgress: "Trabajos en progreso",
    recentDrafts: "Borradores recientes",
    newDraft: "Nuevo borrador",
    lastEdited: "Última edición",
    publishedPosts: "Publicaciones publicadas",
    yourPublishedPosts: "Tus publicaciones publicadas",
    viewAll: "Ver todo",
    noDraftsYet: "Sin borradores aún",
    noDrafts: "Sin borradores aún",
    createFirstDraft: "Crea tu primer borrador",
    noPublishedYet: "Sin publicaciones aún",
    noPublishedPosts: "Sin publicaciones aún",
    publishFirstPost: "Publica tu primera publicación",
    writeFirstPost: "Escribe tu primera publicación",
    shareThoughts: "¡Comparte tus pensamientos con el mundo!",
    posts: "publicaciones",
    refresh: "Actualizar",
    retry: "Reintentar",
    startWritingStory: "Comienza a escribir tu historia",
    
    // Footer
    aboutPlatform: "Una plataforma de blog profesional para creadores y creadores de contenido. Comparte tus historias con el mundo.",
    platform: "Plataforma",
    legal: "Legal",
    legalNotice: "Aviso legal",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Términos de servicio",
    legalRequests: "Solicitudes legales",
    support: "Soporte",
    contact: "Contacto",
    writeArticle: "Escribir artículo",
    allRightsReserved: "Todos los derechos reservados",
    operatedBy: "Operado por ESE-Tech Solutions GmbH • Berlín, Alemania",
    
    // Admin
    userManagement: "Gestión de usuarios",
    contentManagement: "Gestión de contenido",
    platformSettings: "Configuración de plataforma",
    
    // Common
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    
    // Blog
    readMore: "Leer más",
    author: "Autor",
    publishedOn: "Publicado el",
    tags: "Etiquetas",
    
    // Editor
    createNewPost: "Crear nueva publicación",
    shareYourStory: "Comparte tu historia con el mundo",
    enterPostTitle: "Ingresa el título de tu publicación...",
    link: "Enlace",
    startWriting: "Comienza a escribir tu increíble publicación...",
    markdownSupport: "Puedes usar formato Markdown",
    boldText: "texto en negrita",
    italicText: "texto en cursiva",
    headings: "encabezados",
    links: "enlaces",
    markdownSupported: "Soporta formato Markdown",
    characters: "caracteres",
    readyToPublish: "¿Listo para publicar?",
    saving: "Guardando",
    saveDraft: "Guardar borrador",
    publishing: "Publicando",
    publish: "Publicar",
    
    // Site Info
    tagline: "Blog profesional para creadores",
    description: "Donde tus palabras brillan"
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;