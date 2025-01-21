import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { fetchMenuItems, fetchItemList, addItems } from '../dashboardUtils';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



export default function DashboardContent() {

  const [selectedItem, setSelectedItem] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState({nome: '', quantidade: '', preco: ''});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

 

  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
  });

  const { data: itemList = [], isLoading: loading, error: isError } = useQuery({
    queryKey: [`itemList: ${selectedItem?.identificador}`, selectedItem?.identificador],
    queryFn: () => fetchItemList(selectedItem?.identificador),
  });


  const addItemMutation = useMutation({
    mutationFn: (item) => addItems(item, selectedItem?.identificador),
    onSuccess: () => {
      console.log("Item adicionado com sucesso!");
      queryClient.invalidateQueries(`itemList: ${selectedItem?.identificador}`);
      setFormData({ nome: '', quantidade: '', preco: '' });
      setIsDialogOpen(false);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'nome' ? value : value === '' ? '' : Number(value)
    });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemMutation.mutate({
      nome: formData.nome,
      quantidade: parseInt(formData.quantidade, 10),
      preco: parseFloat(formData.preco)
    });
  }


  

  useEffect(() => {
    if (!selectedItem && menuItems.length > 0) {
      setSelectedItem(menuItems[0]);
    }
  }, [menuItems, selectedItem]);


  if (isLoading) {
    return <div>Loading...</div>
  };

  if (error) {
    return <div>Erro ao carregar os itens.</div>;
  }

  if (!menuItems || menuItems.length === 0) {
    return <div>Sem itens para mostrar</div>; // Verificação adicional
  }

  return (

    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white p-6 z-10">
        <h1 className="text-2xl font-bold mb-6">Wayne Industries</h1>
        <nav>
          <ul>
            {menuItems.map((item) => {
              const IconComponent = item.icon; // Pega o ícone da categoria
              return (
                <li key={item.label} className="mb-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className={`flex items-center justify-around w-full p-2 rounded hover:bg-zinc-800 transition-colors ${selectedItem?.label === item.label ? "bg-zinc-800" : ""
                      }`}
                  >
                    {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
                    <span>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</span> {/* Capitaliza a chave */}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bat-principal-bg.jpg"
            alt="Wayne Industries Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-8 text-white h-full overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">{selectedItem?.label}</h2>
          <p className="text-lg mb-4 text-gray-300">{selectedItem?.content}</p>

          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 border border-zinc-800">
            <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
            < div className="grid grid-cols-2 gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsDialogOpen(true)} className="bg-zinc-800 text-white p-6 rounded hover:bg-zinc-700 transition-colors border border-zinc-700">
                    Adicionar {selectedItem?.label}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
                  <DialogHeader>
                    <DialogTitle>Adicionar Item</DialogTitle>
                    <DialogDescription>
                      Adicione um novo item ao inventário. Clique em salvar quando terminar.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantidade
                        </Label>
                        <Input
                          id="quantity"
                          name="quantidade"
                          type="number"
                          value={formData.quantidade}
                          onChange={handleInputChange}
                          className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="value" className="text-right">
                          Valor
                        </Label>
                        <Input
                          id="value"
                          name="preco"
                          type="number"
                          step="0.01"
                          value={formData.preco}
                          onChange={handleInputChange}
                          className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={addItemMutation.isLoading}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        {addItemMutation.isLoading ? 'Adicionando...' : 'Adicionar Item'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button onClick={() => setShowReport(!showReport)} className="bg-zinc-800 text-white p-6 rounded hover:bg-zinc-700 transition-colors border border-zinc-700">
                {showReport ? 'Ocultar Relatório' : 'Gerar Relatório'}
              </Button>
              <Button className="bg-zinc-800 text-white p-6 rounded hover:bg-zinc-700 transition-colors border border-zinc-700">
                Atualizar Inventário
              </Button>
              <Button className="bg-zinc-800 text-white p-6 rounded hover:bg-zinc-700 transition-colors border border-zinc-700">
                Agendar Manutenção
              </Button>
            </div>

            {showReport && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Inventário Atual</h3>
                {loading ? (
                  <p>Carregando itens...</p>
                ) : isError ? (
                  <p>Erro ao carregar itens.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="py-2 px-4">Nome</th>
                          <th className="py-2 px-4">Quantidade</th>
                          <th className="py-2 px-4">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemList.map(item => (
                          <tr key={item.nome} className="border-b border-zinc-800">
                            <td className="py-2 px-4">{item.nome}</td>
                            <td className="py-2 px-4">{item.quantidade}</td>
                            <td className="py-2 px-4">${item.preco.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>

  );
}
//no onSuccess ou no onSettled eu posso fazer algo para que minha lista ja se atualize em tela? Para que o reactQuery veja que um novo item foi adicionado e atualize em tela sem que eu precise clicar para mudar a categoria?