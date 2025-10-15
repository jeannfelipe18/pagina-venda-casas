"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Home, MapPin, Bed, Bath, Square, Car, Plus, Phone, Mail, Instagram } from 'lucide-react'

interface Imovel {
  id: string
  titulo: string
  preco: number
  endereco: string
  cidade: string
  bairro: string
  area: number
  quartos: number
  banheiros: number
  vagas: number
  tipo: string
  descricao: string
  caracteristicas: string[]
  imagem: string
  dataPublicacao: Date
}

export default function CorretoraPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([])

  const [novoImovel, setNovoImovel] = useState<Partial<Imovel>>({
    titulo: '',
    preco: 0,
    endereco: '',
    cidade: '',
    bairro: '',
    area: 0,
    quartos: 0,
    banheiros: 0,
    vagas: 0,
    tipo: '',
    descricao: '',
    caracteristicas: [],
    imagem: ''
  })

  const [dialogAberto, setDialogAberto] = useState(false)
  const [novaCaracteristica, setNovaCaracteristica] = useState('')
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null)

  const adicionarImovel = () => {
    if (!novoImovel.titulo || !novoImovel.preco || !novoImovel.endereco) {
      alert('Por favor, preencha os campos obrigatórios')
      return
    }

    let imagemUrl = novoImovel.imagem || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
    if (imagemArquivo) {
      imagemUrl = URL.createObjectURL(imagemArquivo)
    }

    const imovel: Imovel = {
      id: Date.now().toString(),
      titulo: novoImovel.titulo || '',
      preco: novoImovel.preco || 0,
      endereco: novoImovel.endereco || '',
      cidade: novoImovel.cidade || '',
      bairro: novoImovel.bairro || '',
      area: novoImovel.area || 0,
      quartos: novoImovel.quartos || 0,
      banheiros: novoImovel.banheiros || 0,
      vagas: novoImovel.vagas || 0,
      tipo: novoImovel.tipo || 'Casa',
      descricao: novoImovel.descricao || '',
      caracteristicas: novoImovel.caracteristicas || [],
      imagem: imagemUrl,
      dataPublicacao: new Date()
    }

    setImoveis([imovel, ...imoveis])
    setNovoImovel({
      titulo: '',
      preco: 0,
      endereco: '',
      cidade: '',
      bairro: '',
      area: 0,
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      tipo: '',
      descricao: '',
      caracteristicas: [],
      imagem: ''
    })
    setImagemArquivo(null)
    setDialogAberto(false)
  }

  const adicionarCaracteristica = () => {
    if (novaCaracteristica.trim()) {
      setNovoImovel({
        ...novoImovel,
        caracteristicas: [...(novoImovel.caracteristicas || []), novaCaracteristica.trim()]
      })
      setNovaCaracteristica('')
    }
  }

  const removerCaracteristica = (index: number) => {
    const caracteristicas = novoImovel.caracteristicas || []
    setNovoImovel({
      ...novoImovel,
      caracteristicas: caracteristicas.filter((_, i) => i !== index)
    })
  }

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-full">
                <Home className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Cleide Corretora de Imóveis</h1>
                <p className="text-gray-600">Realizando sonhos, construindo futuros</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="lasy-highlight">(61) 995277358</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>corretoradeimoveis2012@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span>@cleidecorretora</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Seção de Adicionar Imóvel */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Nossos Imóveis</h2>
              <p className="text-gray-600">Encontre o imóvel dos seus sonhos</p>
            </div>
            
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Imóvel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Imóvel</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="titulo">Título *</Label>
                      <Input
                        id="titulo"
                        value={novoImovel.titulo}
                        onChange={(e) => setNovoImovel({...novoImovel, titulo: e.target.value})}
                        placeholder="Ex: Casa Moderna no Centro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preco">Preço (R$) *</Label>
                      <Input
                        id="preco"
                        type="number"
                        value={novoImovel.preco}
                        onChange={(e) => setNovoImovel({...novoImovel, preco: Number(e.target.value)})}
                        placeholder="450000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endereco">Endereço *</Label>
                    <Input
                      id="endereco"
                      value={novoImovel.endereco}
                      onChange={(e) => setNovoImovel({...novoImovel, endereco: e.target.value})}
                      placeholder="Rua das Flores, 123"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        value={novoImovel.cidade}
                        onChange={(e) => setNovoImovel({...novoImovel, cidade: e.target.value})}
                        placeholder="São Paulo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        id="bairro"
                        value={novoImovel.bairro}
                        onChange={(e) => setNovoImovel({...novoImovel, bairro: e.target.value})}
                        placeholder="Centro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="area">Área (m²)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={novoImovel.area}
                        onChange={(e) => setNovoImovel({...novoImovel, area: Number(e.target.value)})}
                        placeholder="180"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quartos">Quartos</Label>
                      <Input
                        id="quartos"
                        type="number"
                        value={novoImovel.quartos}
                        onChange={(e) => setNovoImovel({...novoImovel, quartos: Number(e.target.value)})}
                        placeholder="3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="banheiros">Banheiros</Label>
                      <Input
                        id="banheiros"
                        type="number"
                        value={novoImovel.banheiros}
                        onChange={(e) => setNovoImovel({...novoImovel, banheiros: Number(e.target.value)})}
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vagas">Vagas</Label>
                      <Input
                        id="vagas"
                        type="number"
                        value={novoImovel.vagas}
                        onChange={(e) => setNovoImovel({...novoImovel, vagas: Number(e.target.value)})}
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select value={novoImovel.tipo} onValueChange={(value) => setNovoImovel({...novoImovel, tipo: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Casa">Casa</SelectItem>
                          <SelectItem value="Apartamento">Apartamento</SelectItem>
                          <SelectItem value="Sobrado">Sobrado</SelectItem>
                          <SelectItem value="Kitnet">Kitnet</SelectItem>
                          <SelectItem value="Terreno">Terreno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="imagem">URL da Imagem</Label>
                    <Input
                      id="imagem"
                      value={novoImovel.imagem}
                      onChange={(e) => setNovoImovel({...novoImovel, imagem: e.target.value})}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imagem-arquivo">Ou anexe uma imagem</Label>
                    <Input
                      id="imagem-arquivo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImagemArquivo(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={novoImovel.descricao}
                      onChange={(e) => setNovoImovel({...novoImovel, descricao: e.target.value})}
                      placeholder="Descreva as principais características do imóvel..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Características Especiais</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={novaCaracteristica}
                        onChange={(e) => setNovaCaracteristica(e.target.value)}
                        placeholder="Ex: Piscina, Churrasqueira..."
                        onKeyPress={(e) => e.key === 'Enter' && adicionarCaracteristica()}
                      />
                      <Button type="button" onClick={adicionarCaracteristica} variant="outline">
                        Adicionar
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {novoImovel.caracteristicas?.map((caracteristica, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removerCaracteristica(index)}
                        >
                          {caracteristica} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={adicionarImovel} className="bg-blue-600 hover:bg-blue-700">
                    Adicionar Imóvel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Lista de Imóveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveis.map((imovel) => (
            <Card key={imovel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
              <div className="relative">
                <img
                  src={imovel.imagem}
                  alt={imovel.titulo}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                  {imovel.tipo}
                </Badge>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-lg font-bold text-blue-600">
                    {formatarPreco(imovel.preco)}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">{imovel.titulo}</CardTitle>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{imovel.endereco}</span>
                </div>
                {imovel.cidade && imovel.bairro && (
                  <p className="text-sm text-gray-500">{imovel.bairro}, {imovel.cidade}</p>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{imovel.area}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{imovel.quartos}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{imovel.banheiros}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{imovel.vagas}</span>
                  </div>
                </div>
                
                {imovel.descricao && (
                  <>
                    <Separator className="my-3" />
                    <p className="text-sm text-gray-600 line-clamp-2">{imovel.descricao}</p>
                  </>
                )}
                
                {imovel.caracteristicas.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="flex flex-wrap gap-1">
                      {imovel.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {caracteristica}
                        </Badge>
                      ))}
                      {imovel.caracteristicas.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{imovel.caracteristicas.length - 3}
                        </Badge>
                      )}
                    </div>
                  </>
                )}
                
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Entrar em Contato
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {imoveis.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum imóvel cadastrado</h3>
            <p className="text-gray-500">Adicione o primeiro imóvel para começar!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Cleide Corretora de Imóveis</h3>
              <p className="text-gray-300 text-sm">
                Há mais de 10 anos realizando sonhos e conectando pessoas aos seus lares ideais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 (61) 99527-7358</p>
                <p>✉️ corretoradeimoveis2012@gmail.com</p>
                <p>📍 Aguas Lindas, GO</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Venda de Imóveis</li>
                <li>• Locação</li>
                <li>• Avaliação</li>
                <li>• Consultoria</li>
              </ul>
            </div>
          </div>
          <Separator className="my-6 bg-gray-700" />
          <div className="text-center text-sm text-gray-400">
            © 2024 Cleide Corretora de Imóveis. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
