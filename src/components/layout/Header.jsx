import { useState } from 'react';
import { Search, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Header = ({ onSearch, currentTheme, onThemeToggle, currentLang, onLangToggle }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const translations = {
    ru: { search: 'Поиск города', placeholder: 'Введите название города...' },
    en: { search: 'Search city', placeholder: 'Enter city name...' }
  };

  const t = translations[currentLang];

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 px-6 py-3 glass backdrop-blur-xl rounded-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="font-display text-xl font-bold tracking-tight">
              pogodka
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              onClick={onLangToggle}
              className="hover:bg-white/10 px-3 py-2 h-9 flex items-center gap-2 rounded-xl"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="hover:bg-white/10 w-9 h-9"
            >
              <AnimatePresence mode="wait">
                {currentTheme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-white/10 w-9 h-9"
            >
              <Search className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </header>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="glass border-none max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{t.search}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="mt-4">
            <div className="flex gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.placeholder}
                className="flex-1 glass border-[var(--accent-color)]/30 focus:border-[var(--accent-color)]"
              />
              <Button
                type="submit"
                className="bg-[var(--accent-color)] hover:bg-[var(--accent-secondary)] text-white"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
