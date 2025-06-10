export function Footer() {
  return (
    <footer className="py-8 border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} The Perfume Shop. All rights reserved.</p>
        <p className="mt-1">Discover your signature scent with us.</p>
      </div>
    </footer>
  );
}
